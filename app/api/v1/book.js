const Router = require('koa-router')
const router = new Router()

const { HttpException, ParameterException } = require('./../../../core/http-exception')

router.get('/v1/book', (ctx, next) => {
  console.log(ctx.query, ctx.header, ctx.method, ctx.path)
  if (true) {
    throw new ParameterException('参数a错误', 400)
  }
  ctx.body = {
    data: {
      text: 'v1',
      josn: ctx.query,
      title: 'book'
    }
  }
})

module.exports = router
