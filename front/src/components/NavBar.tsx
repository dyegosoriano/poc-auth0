import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

const NavBar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()
  const { isAdmin, isUser } = useAuth()

  return (
    <nav className="flex flex-col font-[family-name:var(--font-geist-sans)]">
      <header className="p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">Home</Link>
          {isAdmin && <Link to="/admin">Admin Page</Link>}
          {isUser && <Link to="/user">User Page</Link>}

          {isAuthenticated && user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {!!user?.picture && <img src={user.picture} alt={user.name || 'User'} width={40} height={40} className="rounded-full" />}

                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>

              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => logout()}>
                Logout
              </button>
            </div>
          )}

          {!isAuthenticated && (
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => loginWithRedirect()}>
              Login
            </button>
          )}
        </div>
      </header>
    </nav>
  )
}

export default NavBar
