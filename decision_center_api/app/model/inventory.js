'use strict';

/**
 * create table "Inventory"
 * (
 *     "ID"            serial
 *         primary key,
 *     "OrderID"       integer not null,
 *     "EntryQuantity" integer,
 *     "EntryDate"     date,
 *     "CreatedAt"     timestamp with time zone default now()
 * );
 */

/**
 * @typedef {import('egg')} Egg
 * @param {Egg.Application} app egg application
 */
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const Inventory = app.model.define('Inventory', {
    ID: { type: INTEGER, primaryKey: true, autoIncrement: true },
    OrderID: { type: STRING(100), allowNull: false },
    EntryQuantity: { type: INTEGER, allowNull: false },
    EntryDate: { type: DATE, allowNull: false },
    CreatedAt: DATE,
  });

  return Inventory;
};
