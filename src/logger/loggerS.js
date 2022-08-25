// this is the logger for the server
import pino from 'pino'

/*
var streams = [
    {stream: fs.createWriteStream(`./logs/info.log`)},
    //{stream: pretty() },
    {level: 'debug', stream: fs.createWriteStream('./logs/debug.log')},
    {level: 'fatal', stream: fs.createWriteStream('./logs/fatal.log')}
  ]
*/
  
const pinoConfig = {
    name: 'TestApp',
    transport: {
        target: 'pino-pretty',
        options: {
          destination:`./app-pretty.log`,
          colorize: true
        }
      },
}

const logger = pino(pinoConfig)
//const logger = pino(pinoConfig, pino.destination("./app.log"))

export const log = msg => logger.info(msg)
export default logger