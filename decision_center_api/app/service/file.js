'use strict';

const { Service } = require('egg');
const xlsx = require('node-xlsx');

class FileService extends Service {
  async analyzeExcel({ filepath }) {
    const { ctx } = this;

    try {
      const xlsxSheets = xlsx.parse(filepath);
      const sheetData = xlsxSheets[0].data;

      const sheetHeadInfo = await this.calcSheetHeads(sheetData.slice(0, 2));

      const result = {
        success: [],
        failed: [],
      };
      for (const [ idx, record ] of sheetData.slice(2).entries()) {
        try {
          if (record[0]) {
            await this.handleRecord(sheetHeadInfo, record);
            result.success.push(idx);
          }
        } catch (e) {
          result.failed.push(idx);
        }
      }

      return result;
    } catch (e) {
      ctx.throw(400, `获取excel数据失败, ${e}`);
    }
  }


  async calcSheetHeads(headers) {
    const { ctx } = this;
    // const handleDate = d => new Date(1900, 0, d - 1);
    const handleDate = d => new Date(String(d));
    const order_info_map = {
      ExtOrderID: { name: '订单编号', column: null },
      Amount: { name: '订单金额', column: null },
      Unit: { name: '核算单元', column: null },
      Quantity: { name: '交付数量', column: null },
      DeliveryDate: { name: '交付时间', column: null, f: handleDate },
    };
    const inventory_info_map = {
      EntryDate: { name: '入库时间', column: null, f: handleDate },
      EntryQuantity: { name: '入库数量', column: null },
    };
    const customer_info_map = {
      Name: { name: '客户名称', column: null },
    };
    const product_info_map = {
      Name: { name: '产品名称', column: null },
    };

    [
      order_info_map,
      inventory_info_map,
      customer_info_map,
      product_info_map,
    ].forEach(info_map => {
      for (const o_key of Object.keys(info_map)) {
        const info_item = info_map[o_key];
        info_item.column = headers[0].indexOf(info_item.name);
      }
    });

    const definedOrderTypes = await ctx.model.CostType.findAll();
    const cost_info_list = definedOrderTypes.map(typeRecord => {
      const type = typeRecord.toJSON();
      type.name = type.Description;

      if (type.CalculationType === 0) {
        let costColumn = headers[0].indexOf(type.name);
        if (costColumn < 0) {
          costColumn = headers[1].indexOf(type.name);
        }
        type.column = costColumn;
      }

      return type;
    });

    return {
      order_info_map,
      inventory_info_map,
      customer_info_map,
      product_info_map,
      cost_info_list,
    };
  }

  async handleRecord(headerInfo, record) {
    const { ctx } = this;

    const handleQueryMapCalc = (record, info_map) => {
      const query = {};
      for (const filed of Object.keys(info_map)) {
        const f = info_map[filed].f;
        const v = record[info_map[filed].column];
        if (f) {
          query[filed] = f(v);
        } else {
          query[filed] = v;
        }
      }

      return query;
    };

    const t = await this.ctx.model.transaction();
    try {
      // build customer
      const customerName = record[headerInfo.customer_info_map.Name.column];
      let customer = await ctx.model.Customer.findOne({ where: { Name: customerName } });
      if (!customer) {
        customer = await ctx.model.Customer.create({ Name: customerName }, {
          transaction: t,
        });
      }

      // build product
      const productName = record[headerInfo.product_info_map.Name.column];
      let product = await ctx.model.Product.findOne({ where: { Name: productName } });
      if (!product) {
        product = await ctx.model.Product.create({ Name: productName }, {
          transaction: t,
        });
      }

      // build order
      const orderID = record[headerInfo.order_info_map.ExtOrderID.column];
      let order = await ctx.model.Order.findOne({ where: { ExtOrderID: orderID } });
      const orderExist = !!order;
      if (!orderExist) {
        const query = handleQueryMapCalc(record, headerInfo.order_info_map);
        query.CustomerID = customer.ID;
        query.ProductID = product.ID;
        order = await ctx.model.Order.create(query, {
          transaction: t,
        });
      }

      // build inventory
      const query = handleQueryMapCalc(record, headerInfo.inventory_info_map);
      query.OrderID = order.ID;
      await ctx.model.Inventory.create(query, {
        transaction: t,
      });

      // build costs
      const aggregateCostIDs = [ ...new Set(headerInfo.cost_info_list.map(i => i.ParentTypeID)) ];
      const basicCosts = headerInfo.cost_info_list.filter(i => !aggregateCostIDs.includes(i.ID));

      const costModels = [];

      for (const cost of basicCosts) {
        /**
         * cost --> {
         *     "ID": 2,
         *     "ParentTypeID": null,
         *     "Description": "主材费",
         *     "CalculationType": 0,
         *     "AmortizationRatio": null,
         *     "CreatedAt": "2023-02-01T06:08:14.882Z",
         *     "Name": "主材费",
         *     "column": idx
         *   }
         */
        if (cost.CalculationType === 0) {
          const costAmount = record[cost.column];
          if (costAmount === undefined || costAmount === '' || costAmount === null) {
            continue;
            // ctx.throw('empty column');
          }
          if (Number(costAmount) !== 0) {
            costModels.push({
              OrderID: order.ID,
              CostTypeID: cost.ID,
              Amount: costAmount,
            });
          }
        } else if (!orderExist) {
          const costAmount = order.Amount * cost.AmortizationRatio;
          costModels.push({
            OrderID: order.ID,
            CostTypeID: cost.ID,
            Amount: costAmount,
          });
        }
      }

      await ctx.model.Cost.bulkCreate(costModels, {
        returning: true,
        transaction: t,
      });

      await t.commit();
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }
}

module.exports = FileService;
