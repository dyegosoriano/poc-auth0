import { useAuth0 } from '@auth0/auth0-react'

import './App.css'

function App() {
  const { isAuthenticated, loginWithPopup, logout, user } = useAuth0()

  const handleLogin = async () => await loginWithPopup()

  return (
    <>
      {!isAuthenticated && (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>
              Login
            </button>
          </main>
        </div>
      )}

      {isAuthenticated && (
        <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
          <header className="p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">Internal Dashboard</h1>

              {isAuthenticated && user && (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {!!user?.picture && (
                      <img src={user.picture} alt={user.name || 'User'} width={40} height={40} className="rounded-full" />
                    )}

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
            </div>
          </header>

          <main className="flex flex-col items-center justify-center flex-grow container mx-auto p-8">
            <h2 className="text-xl mb-4 text-center">Welcome to your Internal Dashboard</h2>
          </main>
        </div>
      )}
    </>
  )
}

export default App
