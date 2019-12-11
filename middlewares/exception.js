const { HttpException, ParameterException } = require('./../core/http-exception')
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof HttpException) {
      ctx.body = {
        message: err.msg || '服务器有问题，请等你下',
        error_code: err.errorCode || 500,
        request_url: `${ctx.method} ${ctx.path}`
      }
      ctx.status = err.code
    }
  }
}

module.exports = catchError
