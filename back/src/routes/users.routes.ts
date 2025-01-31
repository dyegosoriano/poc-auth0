import { Router } from 'express'
import { jwtCheck } from '../middlewares/auth'

const routes = Router()

routes
  .get('/admin', jwtCheck, (req, res) => res.json({ message: 'Admin endpoint' }))
  .get('/user', jwtCheck, (req, res) => res.json({ message: 'User endpoint' }))

export { routes }
