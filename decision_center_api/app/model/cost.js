'use strict';

/**
 * @typedef {import('egg')} Egg
 * @param {Egg.Application} app egg application
 */
module.exports = app => {
  const { INTEGER, NUMERIC, DATE } = app.Sequelize;
  const Cost = app.model.define('Cost', {
    ID: { type: INTEGER, primaryKey: true, autoIncrement: true },
    OrderID: { type: INTEGER, allowNull: false },
    CostTypeID: { type: INTEGER, allowNull: false },
    Amount: { type: NUMERIC, allowNull: false },
    CreatedAt: DATE,
  });

  return Cost;
};
