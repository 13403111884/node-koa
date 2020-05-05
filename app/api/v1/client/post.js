const Router = require('koa-router')

// const {RegisterValidator} = require('../../validators/client')
const { Client } = require('@models/client')
// const {handleResult} = require('../../lib/helper')

const router = new Router({
  prefix: "/client/v1"
})

router.post('/addClient', async (ctx, next) => {
  const user = ctx.request.body
  const r = await Client.clientAdd(user)
  ctx.body = r
})


module.exports = router
