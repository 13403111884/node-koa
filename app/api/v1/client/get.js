const Router = require('koa-router')

// const {RegisterValidator} = require('../../validators/client')
const { Client } = require('@models/client')
const { Business } = require('@models/business')
// const {handleResult} = require('../../lib/helper')
const { Sequelize } = require('sequelize')
const Op = Sequelize.Op

const router = new Router({
  prefix: "/client/v1"
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
  if (!all) {
    read.offset = +(pageSize * (current - 1))
    read.limit = +pageSize
  }
  const resClient = await Client.clientRead(read)
  const clientId = {}
  const arr = []
  resClient.rows.forEach(item => {
    arr.push(item.id)
  })
  clientId.companyId = {[Op.in]: arr}
  const business = await Business.businesRead({ cond: clientId, all: true})
  const data = await getResClient(resClient, business)
  ctx.body = {
    data,
    code: 200,
    mag: "成功"
  }
})

const getResClient = async (client, business) => {
  client.rows.forEach(item => {
    item.dataValues.business = []
    business.rows.forEach(el => {
      if (item.id === el.companyId) {
        item.dataValues.business.push(el)
      }
    })
  })
  return client
}

module.exports = router
