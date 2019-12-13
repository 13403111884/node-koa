const Router = require('koa-router')
const router = new Router()

let abc = ''

const { PositiveIntegerValidator } = require('../../validators/validator')

const { HttpException, ParameterException } = require('./../../../core/http-exception')

router.get('/v1/:id/book', (ctx, next) => {
  // console.log(ctx.query, ctx.header, ctx.method, ctx.path)
  const v = new PositiveIntegerValidator().validate(ctx)
  const id = v.get('path.id')
  abc = 5
  // v.get('query.a')
  if (!ctx.query.a) {
    throw new ParameterException('参数a错误', 400)
  }
  ctx.body = {
    data: {
      text: 'v1',
      josn: ctx.query,
      abc,
      title: 'book'
    }
  }
})

module.exports = router
