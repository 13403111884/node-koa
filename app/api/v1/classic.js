const Router = require('koa-router')
const router = new Router()

router.get('/v1/classic', (ctx, next) => {
  console.log(ctx.method)
  ctx.body = {
    data: {
      text: 'v1',
      josn: ctx.query
    }
  }
})

module.exports = router
