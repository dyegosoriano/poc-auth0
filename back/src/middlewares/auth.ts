import { auth } from 'express-oauth2-jwt-bearer'

export const jwtCheck = auth({
  issuerBaseURL: process.env.AUTH0_BASE_URL,
  audience: process.env.AUTH0_AUDIENCE,
  tokenSigningAlg: 'RS256'
})
