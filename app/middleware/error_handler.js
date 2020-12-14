'use strict';
const Sentry = require('@sentry/node');
// const Tracing = require("@sentry/tracing");
Sentry.init({
  // dsn: "https://dc4b47f2d1ec4073bf8e5ca0f174f4be@o489951.ingest.sentry.io/5553058",
  dsn: 'http://94ff45beb65f47b69ccf81b76c380bf0@sentry.imfdj.top/4',

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  // tracesSampleRate: 1.0,
});
// const transaction = Sentry.startTransaction({
//   op: "test",
//   name: "My First Test Transaction",
// });
module.exports = (option, app) => {
  return async function(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      app.emit('error', err, this);
      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && app.config.env === 'prod' ? 'Internal Server Error' : err.message;
      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = {
        // code: status, // 服务端自身的处理逻辑错误(包含框架错误500 及 自定义业务逻辑错误533开始 ) 客户端请求参数导致的错误(4xx开始)，设置不同的状态码
        error,
      };
      ctx.status = status;
      /**
       * 参数错误，mysql返回的错误处理
       */
      if (err.parent && err.parent.errno) {
        const res =
          app.config.env === 'prod'
            ? null
            : {
              error,
              detail: err.errors,
            };
        ctx.helper.body.INVALID_REQUEST({ ctx, res, code: err.parent.errno });
      }
      if (status === 422) {
        const res = {
          error,
          detail: err.errors,
        };
        ctx.helper.body.VALIDATION_FAILED({ ctx, res });
      } else {
        Sentry.captureException(err);
        // transaction.finish();
      }
    }
  };
};
