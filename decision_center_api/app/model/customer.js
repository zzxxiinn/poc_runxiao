'use strict';

/**
 * @typedef {import('egg')} Egg
 * @param {Egg.Application} app egg application
 */
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const Customer = app.model.define('Customer', {
    ID: { type: INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: STRING(1024), allowNull: false },
    CreatedAt: DATE,
  });

  return Customer;
};
