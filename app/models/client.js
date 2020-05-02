const bcrypt = require('bcryptjs')

const { sequelize } = require('../../core/db');
const { Sequelize, Model } = require('sequelize');

// 定义用户模型
class Client extends Model {
  // 用户列表
  static async clientRead(params) {
    // 查询用户
    const { offset = 0, limit = 10, cond = {}} = params
    const { count, rows } = await Client.findAndCountAll({
      where: cond,
      offset,
      limit
    })
    return { count, rows }
  }

  // 添加用户
  static async clientAdd(params) {
    // 查询用户
    const client = await Client.create(params).then(res => {
      return res.id
    }).catch(err => {
      return err
    })
    return client
  }

  // 编辑用户
  static async clientEdit(params) {
    // 查询用户
    const client = await Client.update(params, { where: { id: params.id } }).then(() => {
      return "Done"
    })
    return client
  }

  // 删除用户
  static async clientDel(params) {
    // 查询用户
    const client = await Client.destroy({ where: { id: params.id } }).then(() => {
      return "Done"
    })
    return client
  }

}

// 初始用户模型
Client.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  identityNeme: Sequelize.STRING,
  company: Sequelize.STRING,
  name: Sequelize.STRING,
  area: Sequelize.STRING,
  business: Sequelize.STRING,
  // // {   
  // //     product: {},
  // //     cTime: {},
  // //     amount: {},
  // //     profit: {},
  // // }
  remarks: Sequelize.STRING
}, {
  sequelize,
  tableName: 'client'
})


module.exports = {
  Client
}
