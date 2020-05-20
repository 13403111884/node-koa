const Router = require('koa-router')

// const {RegisterValidator} = require('../../validators/client')
const { Business } = require('@models/business')
// const {handleResult} = require('../../lib/helper')

const router = new Router({
  prefix: "/business/v1"
})

router.get('/read', async (ctx, next) => {
  let { pageSize = 10, current = 1, all, params = null } = ctx.query
  const cond = {}
  if (params) {
    params = JSON.parse(params)
    Object.keys(params).forEach(key => {
      if (params[key]) {
        if (['phone'].includes(key)) {
          cond[key] = params[key]
        } else {
          cond[key] = { [Op.like]: `%${params[key]}%` }
        }
      }
    })
  }
  const read = { cond }
  if (all) {
    read.all = true
  } else {
    read.offset = +(pageSize * (current - 1))
    read.limit = +pageSize
  }
  const r = await Business.businesRead(read)
  ctx.body = {
    data: r,
    code: 200,
    mag: "成功"
  }
})

module.exports = router
