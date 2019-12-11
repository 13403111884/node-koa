// require('babel-register')
const Koa  = require('koa')
const initManager = require('./core/init')
const catchError = require('./middlewares/exception')

const app = new Koa()

app.use(catchError)
initManager.initCore(app)

app.listen(3000)
