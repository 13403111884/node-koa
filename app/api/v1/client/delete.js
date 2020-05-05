const Router = require('koa-router')

// const {RegisterValidator} = require('../../validators/client')
const { Client } = require('@models/client')
// const {handleResult} = require('../../lib/helper')

const router = new Router({
  prefix: "/client/v1"
})

router.del('/delete/:id', async (ctx, next) => {
  const user = ctx.params
  console.log(user)
  const r = await Client.clientDel(user)
  ctx.body = {
    id: r,
    mag: "成功"
  }
})


module.exports = router
