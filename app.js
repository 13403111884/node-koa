require('module-alias/register')

const Koa = require('koa')
const cors = require('koa2-cors')
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')

const app = new Koa()

app.use(
  cors({
    origin: function (ctx) { //设置允许来自指定域名请求
      const whiteList = ['http://www.elegantwalking.com', 'http://crm.elegantwalking.com'] //可跨域白名单
      let url = ctx.header.referer.substr(0, ctx.header.referer.length - 1)
      if (whiteList.includes(url)) {
        return url //注意，这里域名末尾不能带/，否则不成功
      }
      return 'http://localhost:4331' //默认允许本地请求3000端口可跨域
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
)

app.use(catchError)
app.use(parser())

InitManager.initCore(app)

app.listen(5000)
