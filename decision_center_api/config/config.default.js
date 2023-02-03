/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1675230406708_3722';

  // add your middleware config here
  config.middleware = [
    'fakeToken',
  ];

  config.fakeToken = {
    ignore: [ '/api/token' ],
  };

  config.multipart = {
    mode: 'file',
    allowArrayField: true,
    fileSize: '500mb',
    fileExtensions: [
      '.xls', '.xlsx',
    ],
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH, OPTIONS',
  };

  config.sequelize = {
    dialect: 'postgres',
    logging: true,
    benchmark: true,
    define: {
      charset: 'utf8',
      timestamps: false,
      freezeTableName: true,
      createdAt: 'CreatedAt',
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
