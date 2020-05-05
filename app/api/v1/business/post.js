const Router = require('koa-router')

// const {RegisterValidator} = require('../../validators/client')
const { Business } = require('@models/business')
// const {handleResult} = require('../../lib/helper')

const router = new Router({
  prefix: "/business/v1"
})

router.post('/addBusiness', async (ctx, next) => {
  const user = ctx.request.body
  const r = await Business.businesAdd(user)
  ctx.body = r
})


module.exports = router
