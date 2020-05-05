const Router = require('koa-router')

// const {RegisterValidator} = require('../../validators/client')
const { Business } = require('@models/business')
// const {handleResult} = require('../../lib/helper')

const router = new Router({
  prefix: "/business/v1"
})

router.put('/edit', async (ctx, next) => {
  const user = ctx.request.body
  const r = await Business.businessEdit(user)
  ctx.body = {
    id: r,
    mag: "成功"
  }
})


module.exports = router
