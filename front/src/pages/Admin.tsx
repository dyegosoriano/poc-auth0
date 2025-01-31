import { useState, useEffect } from 'react'
import axios from 'axios'

import { IUserProfile } from '../types/UserProfile'
import { useAuth } from '../hooks/useAuth'
import { IRole } from '../types/Roles'

const Admin = () => {
  const { getAccessTokenSilently } = useAuth()

  const [users, setUsers] = useState<IUserProfile[]>([])
  const [roles, setRoles] = useState<IRole[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const api_url = 'http://localhost:3000/'
        const token = await getAccessTokenSilently()

        const [responseUsers, responseRoles] = await Promise.all([
          axios.get(api_url + 'users', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(api_url + 'roles', { headers: { Authorization: `Bearer ${token}` } })
        ])

        setUsers(responseUsers?.data?.users || [])
        setRoles(responseRoles?.data?.roles || [])

        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }

    fetchAdmins()
  }, [getAccessTokenSilently])

  if (loading) return <div>Carregando...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Gestão de Funções</h2>
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

        <h2 className="text-xl font-semibold mb-4">Gestão de Usuários</h2>
        <table className="min-w-full mb-8">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nome</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Último Login</th>
              <th className="py-2 px-4 border-b">Total de logins</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.user_id}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{new Date(user.last_login).toLocaleString()}</td>
                <td className="py-2 px-4 border-b">{user.logins_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin
