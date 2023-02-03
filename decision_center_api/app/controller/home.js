'use strict';

const { Controller } = require('egg');
const { fake_token } = require('../constant');

class HomeController extends Controller {
  async login() {
    const { ctx } = this;
    const { body: loginInfo = {} } = ctx.request;

    const { username, password } = loginInfo;

    if (username === 'admin' && password === '123456') {
      ctx.status = 200;
      ctx.body = fake_token;
    } else {
      ctx.status = 401;
      ctx.body = 'login failed';
    }
  }
}

module.exports = HomeController;
