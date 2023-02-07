const { fake_token } = require('../constant');

module.exports = options => {
  return async function fakeToken(ctx, next) {
    const requestHeaders = ctx.request.headers;


    const { ignore = [] } = options;
    if (ignore.includes(ctx.originalUrl)) {
      await next();
    } else {
      if (requestHeaders['x-auth-key'] === `Bearer ${fake_token}`) {
        await next();
      } else {
        ctx.status = 401;
        ctx.body = 'Unauthorized';
      }
    }
  };
};
