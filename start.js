const Koa  = require('koa')
const initManager = require('./core/init')

const app = new Koa()

initManager.initCore(app)

app.listen(3000)