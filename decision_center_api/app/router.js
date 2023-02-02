'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.post('/api/token', controller.home.login);
  router.post('/api/excel', controller.file.handleExcel);
};
