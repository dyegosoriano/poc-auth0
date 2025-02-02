import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import axios from 'axios'

import { IUserProfile } from '../types/UserProfile'
import { IRole } from '../types/Roles'

const User = () => {
  const { getAccessTokenSilently, user: userAuth } = useAuth()

  const [user, setUser] = useState<IUserProfile>()
  const [roles, setRoles] = useState<IRole[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)

      try {
        const token = await getAccessTokenSilently()
        const api_url = 'http://localhost:3000/'

        const headers = { headers: { Authorization: `Bearer ${token}` } }

        const [roleResponse, userResponse] = await Promise.all([
          axios.get(api_url + 'users/' + userAuth?.sub + '/roles', headers),
          axios.get(api_url + 'users/' + userAuth?.sub, headers)
        ])

        setRoles(roleResponse?.data)
        setUser(userResponse?.data)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    fetchUserData()
  }, [getAccessTokenSilently])

  if (loading) return <div>Carregando...</div>

  return (
    <div className="container mx-auto p-4">
      {user && (
        <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">Perfil do Usuário</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <img src={user?.picture} alt={user?.name} className="w-32 h-32 rounded-full mb-4" />
              <p>
                <strong>Nome:</strong> {user?.name}
              </p>
              <p>
                <strong>Nickname:</strong> {user?.nickname}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Email Verificado:</strong> {user?.email_verified ? 'Sim' : 'Não'}
              </p>
            </div>

            <div className="mt-12">
              <p>
                <strong>ID do Usuário:</strong> {user?.user_id}
              </p>
              <p>
                <strong>Criado em:</strong> {new Date(user?.created_at).toLocaleString()}
              </p>
              <p>
                <strong>Atualizado em:</strong> {new Date(user?.updated_at).toLocaleString()}
              </p>
              <p>
                <strong>Último Login:</strong> {new Date(user?.last_login).toLocaleString()}
              </p>
              <p>
                <strong>Último IP:</strong> {user?.last_ip}
              </p>
              <p>
                <strong>Número de Logins:</strong> {user?.logins_count}
              </p>
            </div>
          </div>
        </div>
      )}

      {roles && (
        <div>
          <h2 className="text-xl font-semibold mt-12 mb-4">Permissões do usuário</h2>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Nome</th>
                <th className="py-2 px-4 border-b">Descrição</th>
              </tr>
            </thead>
            <tbody>
              {roles.map(role => (
                <tr key={role.id}>
                  <td className="py-2 px-4 border-b">{role.id}</td>
                  <td className="py-2 px-4 border-b">{role.name}</td>
                  <td className="py-2 px-4 border-b">{role.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default User
