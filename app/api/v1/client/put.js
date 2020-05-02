const Router = require('koa-router')

// const {RegisterValidator} = require('../../validators/client')
const { Client } = require('@models/client')
// const {handleResult} = require('../../lib/helper')

const router = new Router({
  prefix: "/v1/client"
})

router.put('/edit', async (ctx, next) => {
  const user = ctx.request.body
  const r = await Client.clientEdit(user)
  ctx.body = {
    id: r,
    mag: "成功"
  }
})


module.exports = router
