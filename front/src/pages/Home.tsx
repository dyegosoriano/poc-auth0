import { useAuth0 } from '@auth0/auth0-react'

const Home = () => {
  const { isAuthenticated, user } = useAuth0()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Sistema</h1>

      {isAuthenticated && (
        <div>
          <p className="mb-2">Olá, {user?.name}!</p>
          <p className="">Use o menu acima para navegar para suas áreas permitidas.</p>
        </div>
      )}

      {!isAuthenticated && <p className="">Faça login para acessar as funcionalidades do sistema.</p>}
    </div>
  )
}

export default Home
