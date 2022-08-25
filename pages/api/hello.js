// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import logger from '../../src/logger/loggerS'

export default function handler(req, res) {
  logger.info(req)
  res.status(200).json({ name: 'Hello, from public!!' })
}
