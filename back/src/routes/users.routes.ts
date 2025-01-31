import { Router } from 'express'

import { jwtCheck, management } from '../middlewares/auth'

const usersRoutes = Router()

usersRoutes.get('/users', jwtCheck, async (req: Request, res: Response) => {
  const response = await management.users.getAll()

  return res.json({ users: response.data })
})

export { usersRoutes }
