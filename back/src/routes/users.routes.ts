import { Router, Request, Response } from 'express'

import { jwtCheck, management } from '../middlewares/auth'

const usersRoutes = Router()

usersRoutes
  .get('/users', jwtCheck, async (req: Request, res: Response) => {
    try {
      const response = await management.users.getAll()
      return res.json(response.data)
    } catch (error) {
      res.status(500).json({ error: 'Failed to list users' })
    }
  })
  .get('/users/:id', jwtCheck, async (req: Request, res: Response) => {
    try {
      const response = await management.users.get({ id: req.params.id })
      return res.json(response.data)
    } catch (error) {
      res.status(500).json({ error: 'Failed to list users' })
    }
  })
  .get('/users/:user_id/roles', jwtCheck, async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params
      const response = await management.users.getRoles({ id: user_id })
      return res.json(response.data)
    } catch (error) {
      res.status(500).json({ error: 'Failed to list user roles' })
    }
  })

export { usersRoutes }
