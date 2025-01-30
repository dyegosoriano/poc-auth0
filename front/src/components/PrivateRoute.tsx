import { Navigate } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, hasRole } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/" />
  }

  return children
}

export default PrivateRoute
