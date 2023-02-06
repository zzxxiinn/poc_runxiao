'use strict';


const parseConnectionString = str => {
  if (!str) return;
  const splits = (str).split('@');
  if (splits.length === 2) {
    const [ user, password ] = splits[0].split(':');
    const [ host, port ] = splits[1].split(':');
    return { user, password, host, port: parseInt(port) };
  } else if (splits.length === 1) {
    const [ host, port ] = splits[0].split(':');
    return { host, port: parseInt(port) };
  }
};


/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  const connectionString = process.env.PG_CONNECTION_STRING;
  const pg = parseConnectionString(connectionString);


  config.sequelize = {
    logging: true,
    host: pg.host,
    port: pg.port,
    // POSTGRES_DATABASE -> PG_DATABASE
    // 为了兼容性，这样能保证新镜像和旧环境变量可以正常工作
    database: process.env.PG_DATABASE,
    username: pg.user,
    password: pg.password,
  };


  return {
    ...config,
  };
};
