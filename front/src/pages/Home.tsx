import { useAuth0 } from '@auth0/auth0-react'

const Home = () => {
  const { isAuthenticated, user } = useAuth0()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-white text-3xl font-bold mb-4">Bem-vindo ao Sistema</h1>

      {isAuthenticated && (
        <div>
          <p className="text-white mb-2">Olá, {user?.name}!</p>
          <p className="text-white">Use o menu acima para navegar para suas áreas permitidas.</p>
        </div>
      )}

      {!isAuthenticated && <p className="text-white">Faça login para acessar as funcionalidades do sistema.</p>}
    </div>
  )
}

export default Home
