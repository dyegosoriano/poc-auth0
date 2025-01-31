import { NextFunction, Request, Response } from 'express'
import { auth } from 'express-oauth2-jwt-bearer'
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
