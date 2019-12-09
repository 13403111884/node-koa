const requireDirectory = require('require-directory')
const Router = require('koa-router')

class initManager {
  static initCore (app) {
    initManager.app = app
    initManager.initLoadRouters()
  }
  static initLoadRouters () {
    requireDirectory(module, `${process.cwd()}/app/api`, { visit: whenLoadModules })

    function whenLoadModules (obj) {
      if (obj instanceof Router) {
        initManager.app.use(obj.routes())
      }
    }
  }
}

module.exports = initManager
