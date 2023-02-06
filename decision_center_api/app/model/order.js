'use strict';

/**
 * create table "Order"
 * (
 *     "ID"           serial                              primary key,
 *     "ExtOrderID"   varchar(100)                           not null,
 *     "CustomerID"   integer                                not null,
 *     "ProductID"    integer                                not null,
 *     "Amount"       numeric                                not null,
 *     "Unit"         varchar(10)                            not null,
 *     "Quantity"     integer                                not null,
 *     "DeliveryDate" timestamp with time zone               not null,
 *     "EntryDate"    timestamp with time zone               not null,
 *     "CreatedAt"    timestamp with time zone default now() not null
 * );
 */

/**
 * @typedef {import('egg')} Egg
 * @param {Egg.Application} app egg application
 */
module.exports = app => {
  const { INTEGER, STRING, DATE, NUMERIC } = app.Sequelize;
  const Order = app.model.define('Order', {
    ID: { type: INTEGER, primaryKey: true, autoIncrement: true },
    ExtOrderID: { type: STRING(100), allowNull: false },
    CustomerID: { type: INTEGER, allowNull: false },
    ProductID: { type: INTEGER, allowNull: false },
    Amount: { type: NUMERIC, allowNull: false },
    Unit: { type: STRING(10), allowNull: false, defaultValue: '' },
    Quantity: { type: INTEGER, allowNull: false },
    DeliveryDate: { type: DATE, allowNull: false },
    CreatedAt: DATE,
  });

  return Order;
};
