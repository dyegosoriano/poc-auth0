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
  .post('/users/:user_id/roles', jwtCheck, async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params
      const { role_id } = req.body

      if (!role_id) return res.status(400).json({ error: 'Role ID is required' })

      const response = await management.users.getRoles({ id: user_id })

      if (response.data.length > 0) {
        const roles = response.data.map(item => item.id)
        await management.users.deleteRoles({ id: user_id }, { roles })
      }

      await management.users.assignRoles({ id: user_id }, { roles: [role_id] })

      res.status(200).json({ message: 'User role updated successfully' })
    } catch (error) {
      console.error('Error updating user role:', error)
      res.status(500).json({ error: 'Failed to update user role' })
    }
  })

export { usersRoutes }
