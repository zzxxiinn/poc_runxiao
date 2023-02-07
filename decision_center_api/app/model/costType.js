'use strict';

/**
 * @typedef {import('egg')} Egg
 * @param {Egg.Application} app egg application
 */
module.exports = app => {
  const { INTEGER, SMALLINT, STRING, NUMERIC, DATE } = app.Sequelize;
  const CostType = app.model.define('CostType', {
    ID: { type: INTEGER, primaryKey: true, autoIncrement: true },
    ParentTypeID: { type: INTEGER, allowNull: true },
    Description: { type: STRING(20), allowNull: false, defaultValue: '' },
    CalculationType: { type: SMALLINT, allowNull: false },
    AmortizationRatio: { type: NUMERIC, allowNull: true },
    CreatedAt: DATE,
  });

  return CostType;
};
