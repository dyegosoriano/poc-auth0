import { Router, Request, Response } from 'express'

import { jwtCheck, management } from '../middlewares/auth'

const rolesRoutes = Router()

rolesRoutes.get('/roles', jwtCheck, async (_req: Request, res: Response) => {
  try {
    const response = await management.roles.getAll()
    return res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to list roles' })
  }
})

export { rolesRoutes }
