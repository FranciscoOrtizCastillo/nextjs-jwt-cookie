
import logger from '../../../src/logger/loggerS'

export default function handler(req, res) {
  logger.info(req)
  res.status(401).json({ message: 'Not authenticated.' });
};