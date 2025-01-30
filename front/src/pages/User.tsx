import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'
// import axios from 'axios';

const User = () => {
  const { user, getAccessTokenSilently } = useAuth0()

  const [activities, setActivities] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getAccessTokenSilently()
        // const [profileResponse, activitiesResponse] = await Promise.all([
        //   axios.get('http://localhost:3000/api/user/profile', {
        //     headers: {
        //       Authorization: `Bearer ${token}`
        //     }
        //   }),
        //   axios.get('http://localhost:3000/api/user/activities', {
        //     headers: {
        //       Authorization: `Bearer ${token}`
        //     }
        //   })
        // ]);

        // setProfile(profileResponse.data);
        // setActivities(activitiesResponse.data);
        setLoading(false)
      } catch (err) {
        setError('Erro ao carregar dados do usuário')
        setLoading(false)
      }
    }

    fetchUserData()
  }, [getAccessTokenSilently])

  if (loading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="text-center mb-4">
              <img src={user.picture} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Detalhes do Perfil</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Status:</span> <span className="text-green-600">Ativo</span>
                </p>
                <p>
                  <span className="font-medium">Membro desde:</span> {new Date(user.updated_at).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Último acesso:</span> {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Atividades Recentes</h2>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-gray-600">{new Date(activity.date).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Total de Acessos</h3>
              <p className="text-3xl font-bold text-indigo-600">{profile?.totalLogins || 0}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Dias Ativos</h3>
              <p className="text-3xl font-bold text-indigo-600">{profile?.activeDays || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
