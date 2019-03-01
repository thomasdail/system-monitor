import * as express from 'express'
import * as psList from 'ps-list'
import * as _ from 'underscore'

class App {
  public express: express.Application

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router = express.Router()
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      })
    })
    router.get('/ps', (req, res) => {
      psList().then((result) => {
        var sortedProcess: psList.ProcessDescriptor[] = _.sortBy(result, (process) => {
          return process.cpu
        }).reverse()
        res.json(sortedProcess.slice(0, 10))
      })
    })
    this.express.use('/', router)
  }
}

export default new App().express