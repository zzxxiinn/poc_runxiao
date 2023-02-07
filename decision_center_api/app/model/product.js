'use strict';

/**
 * create table "Product"
 * (
 *     "ID"        serial                             primary key,
 *     "Name"      varchar(1024)                          not null,
 *     "CreatedAt" timestamp with time zone default now() not null
 * );
 */

/**
 * @typedef {import('egg')} Egg
 * @param {Egg.Application} app egg application
 */
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const Product = app.model.define('Product', {
    ID: { type: INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: STRING(1024), allowNull: false },
    CreatedAt: DATE,
  });

  return Product;
};
