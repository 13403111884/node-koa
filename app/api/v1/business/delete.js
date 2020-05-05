const Router = require('koa-router')

// const {RegisterValidator} = require('../../validators/client')
const { Business } = require('@models/business')
// const {handleResult} = require('../../lib/helper')

const router = new Router({
  prefix: "/business/v1"
})

router.del('/delete/:id', async (ctx, next) => {
  const user = ctx.params
  console.log(user)
  const r = await Business.businessDel(user)
  ctx.body = {
    id: r,
    mag: "成功"
  }
})


module.exports = router
