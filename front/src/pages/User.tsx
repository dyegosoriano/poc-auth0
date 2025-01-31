import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import axios from 'axios'

const User = () => {
  const { getAccessTokenSilently, user } = useAuth()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getAccessTokenSilently()
        const response = await axios.get('http://localhost:3000/user', { headers: { Authorization: `Bearer ${token}` } })
        console.log({ response })

        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }

    fetchUserData()
  }, [getAccessTokenSilently])

  if (loading) return <div>Carregando...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="shadow-md rounded-lg p-6">
            <div className="text-center mb-4">
              <img src={user?.picture} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Detalhes do Perfil</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Membro desde:</span>{' '}
                  {user?.updated_at ? new Date(user?.updated_at).toLocaleDateString() : ''}
                </p>

                <p>
                  <span className="font-medium">Último acesso:</span> {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
