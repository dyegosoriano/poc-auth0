import { Navigate } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, hasPermission } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  if (requiredRole && hasPermission(requiredRole)) {
    return <Navigate to="/" />
  }

  return children
}

export default PrivateRoute
