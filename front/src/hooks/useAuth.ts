import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import * as jwt from 'jwt-decode'

export const useAuth = () => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0()
  const [permissions, setPermissions] = useState<string[]>([])

  const hasPermission = (permission: string) => permissions?.includes(permission) || false

  useEffect(() => {
    const getUserPermissions = async () => {
      if (!isAuthenticated) return

      try {
        const token = await getAccessTokenSilently()
        const decodedToken: { permissions: [] } = jwt.jwtDecode(token)

        setPermissions(decodedToken?.permissions || [])
      } catch (error) {
        console.error('Erro ao obter permissões:', error)
      }
    }

    getUserPermissions()
  }, [isAuthenticated])

  return {
    getAccessTokenSilently,
    isAuthenticated,
    hasPermission,
    permissions,
    user
  }
}
