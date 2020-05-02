const Router = require('koa-router')

// const {RegisterValidator} = require('../../validators/client')
const { Client } = require('@models/client')
// const {handleResult} = require('../../lib/helper')

const router = new Router({
  prefix: "/v1/client"
})

router.get('/read', async (ctx, next) => {
  const { pageSize = 10, current = 1, cond = {} } = ctx.query
  const params = {
    cond,
    offset: +(pageSize * (current - 1)),
    limit: +pageSize
  }
  const r = await Client.clientRead(params)
  ctx.body = {
    data: r,
    mag: "成功"
  }
})

module.exports = router
