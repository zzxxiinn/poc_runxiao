'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  config.sequelize = {
    logging: true,
    host: '192.168.0.153',
    port: 5432,
    database: 'DecisionIntelligence',
    username: 'postgres',
    password: 'Kt4C4TCHJ3',
  };


  return {
    ...config,
  };
};
