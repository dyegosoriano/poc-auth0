import { useAuth0 } from '@auth0/auth0-react'

export const useAuth = () => {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0()

  const hasRole = role => user?.['http://localhost:3000/roles']?.includes(role) || false

  return {
    isAdmin: hasRole('admin'),
    isUser: hasRole('user'),
    getAccessTokenSilently,
    isAuthenticated,
    hasRole,
    user
  }
}
