import { NextFunction, Request, Response } from 'express'

export const debugMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Headers:', req.headers)
  console.log('Auth Header:', req.headers.authorization)
  next()
}
