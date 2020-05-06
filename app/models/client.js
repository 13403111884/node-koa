const { sequelize } = require('../../core/db');
// const { Business } = require('./business');
const { Sequelize, Model } = require('sequelize');

// 定义用户模型
class Client extends Model {
  // 用户列表
  // StudentModel.belongsTo(ClassModel, {as: 'cla', foreignKey: 'cId', targetKey: 'classId'});
  static async clientRead(params) {
    // 查询用户
    const { offset = 0, limit = 10, cond = {}} = params
    const { count, rows } = await Client.findAndCountAll({
      where: cond,
      order: [['id', 'DESC']],
      // include:[
      //   { // include关键字表示关联查询
      //     model: Business, // 指定关联的model
      //     as: 'cla', // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
      //     attributes: [['name','className'], 'rank'], // 这里的attributes属性表示查询class表的name和rank字段，其中对name字段起了别名className
      //   }
      // ],
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
  company: Sequelize.STRING,
  name: Sequelize.STRING,
  phone: Sequelize.STRING,
  area: Sequelize.STRING,
  industry: Sequelize.STRING,
  remarks: Sequelize.STRING
}, {
  sequelize,
  tableName: 'client'
})


module.exports = {
  Client
}
