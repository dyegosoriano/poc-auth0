import { UnauthorizedError } from 'express-oauth2-jwt-bearer'
import { NextFunction, Request, Response } from 'express'

import { AppError } from '../shared/AppError'

export default {
  notFound(_req: Request, _res: Response, _next: NextFunction) {
    throw new AppError('Not found', 404)
  },

  globalErrors(error: Error, _req: Request, res: Response, _next: NextFunction) {
    if (error instanceof AppError) return res.status(error.statusCode).json(error)
    if (error instanceof UnauthorizedError) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token', error: error.message })
    }

    // TODO: implementar método para salvar os logs de erros em um banco de dados.
    console.log(error.stack)

    res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
}
