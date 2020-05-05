const bcrypt = require('bcryptjs')

const { sequelize } = require('../../core/db');
const { Sequelize, Model } = require('sequelize');

// 定义用户模型
class Business extends Model {
  // 用户列表
  static async businesRead(params) {
    // 查询用户
    const { offset = 0, limit = 10, cond = {}} = params
    const { count, rows } = await Business.findAndCountAll({
      where: cond,
      offset,
      limit
    })
    return { count, rows }
  }

  // 添加用户
  static async businesAdd(params) {
    // 查询用户
    const business = await Business.create(params).then(res => {
      return res.id
    }).catch(err => {
      return err
    })
    return business
  }

  // 编辑用户
  static async businesEdit(params) {
    // 查询用户
    const business = await Business.update(params, { where: { id: params.id } }).then(() => {
      return "Done"
    })
    return business
  }

  // 删除用户
  static async businesDel(params) {
    // 查询用户
    const business = await Business.destroy({ where: { id: params.id } }).then(() => {
      return "Done"
    })
    return business
  }

}

// 初始用户模型
Business.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  companyId: Sequelize.INTEGER,
  product: Sequelize.STRING,
  ctime: Sequelize.DATE,
  amount: Sequelize.INTEGER,
  profit: Sequelize.INTEGER
}, {
  sequelize,
  tableName: 'business'
})


module.exports = {
  Business
}
