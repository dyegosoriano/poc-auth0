import { auth, claimCheck, InsufficientScopeError } from 'express-oauth2-jwt-bearer'
import { NextFunction, Request, Response } from 'express'
import { ManagementClient } from 'auth0'

export const jwtCheck = auth({
  issuerBaseURL: process.env.AUTH0_BASE_URL,
  audience: process.env.AUTH0_AUDIENCE,
  tokenSigningAlg: 'RS256'
})

export const management = new ManagementClient({
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
  clientId: process.env.AUTH0_CLIENT_ID!,
  domain: process.env.AUTH0_DOMAIN!
})

export const checkPermissions = (requiredPermissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const permissionCheck = claimCheck(payload => {
      const userPermissions = (payload.permissions as string[]) || []

      const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission))
      if (!hasAllPermissions) throw new InsufficientScopeError()

      return true
    })

    permissionCheck(req, res, err => {
      if (err instanceof InsufficientScopeError) {
        return res.status(403).json({
          message: 'You do not have the required permissions to access this resource.',
          error: 'Insufficient permissions',
          requiredPermissions
        })
      }

      next()
    })
  }
}
