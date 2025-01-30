import 'dotenv/config'
import { AppServer } from './app'

const port = Number(process.env.PORT) || 3333
const app = new AppServer()

const server = app.start(port)

function gracefulShutdown(_code: string) {
  return (event: any) => {
    console.info(`${event} signal received with code ${event}`)
    console.info('Closing http server...')

    server.close(async () => {
      console.info('Http server closed.')

      process.exit(1)
    })
  }
}

process.on('SIGTERM', gracefulShutdown('SIGTERM'))
process.on('SIGINT', gracefulShutdown('SIGINT'))

process.on('unhandledRejection', (error, _origin) => console.info('\nUnhandled rejection signal received.', error))
process.on('uncaughtException', (error, origin) => console.info(`\n${origin} signal received.`, error))
process.on('exit', code => console.info('Exit signal received.', code))
