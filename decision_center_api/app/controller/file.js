'use strict';

const { Controller } = require('egg');

class FileController extends Controller {
  async handleExcel() {
    const { ctx } = this;

    const file = ctx.request.files[0];
    const result = await ctx.service.file.analyzeExcel(file);

    ctx.status = 200;
    ctx.body = result;
  }
}

module.exports = FileController;
