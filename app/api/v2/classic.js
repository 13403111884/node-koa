const Router = require('koa-router')
const router = new Router()

router.get('/v2/classic', (ctx, next) => {
  console.log(ctx.method)
  ctx.body = {
    data: {
      text: 'v2',
      josn: ctx.query
    }
  }
})

module.exports = router
