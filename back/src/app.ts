import 'reflect-metadata'
import 'express-async-errors'
import 'dotenv/config'

import express, { Application } from 'express'
import cors from 'cors'

import errorHandling from './middlewares/errorHandling'
import { debugMiddleware } from './middlewares/debug'
import { routes } from './routes/users.routes'

export class AppServer {
  private readonly server: Application

  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()
    this.errorsHandler()
  }

  start(port: number, callback?: Function) {
    return this.server.listen(port, () => {
      console.info(`🚀 Server is running port: ${port}`)
      console.info(`Worker started pid: ${process.pid}`)

      if (callback) callback(process.pid)
    })
  }

  private errorsHandler() {
    this.server.use(errorHandling.notFound)
    this.server.use(errorHandling.globalErrors)
  }

  private middlewares() {
    if (process.env.DEBUG === 'TRUE') this.server.use(debugMiddleware)
    this.server.disable('x-powered-by')
    this.server.use(cors())

    this.server.use(express.json())
  }

  private routes() {
    this.server.use(routes)
  }
}
