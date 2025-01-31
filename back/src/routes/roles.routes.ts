import { Router } from 'express'

import { jwtCheck, management } from '../middlewares/auth'

const rolesRoutes = Router()

rolesRoutes.get('/roles', jwtCheck, async (req: Request, res: Response) => {
  const response = await management.roles.getAll()

  return res.json({ roles: response.data })
})

export { rolesRoutes }
