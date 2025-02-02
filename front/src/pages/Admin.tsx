import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import { IUserProfile } from '../types/UserProfile'
import { useAuth } from '../hooks/useAuth'
import { IRole } from '../types/Roles'

const Admin = () => {
  const { getAccessTokenSilently } = useAuth()
  const navigate = useNavigate()

  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [users, setUsers] = useState<IUserProfile[]>([])
  const [roles, setRoles] = useState<IRole[]>([])
  const [loading, setLoading] = useState(true)

  const toggleDropdown = (userId: string) => setOpenDropdown(openDropdown === userId ? null : userId)
  const handleUserClick = (userId: string) => navigate(`/user/${userId}`)

  const handleRoleChange = async (userId: string, roleId: string) => {
    try {
      const token = await getAccessTokenSilently()
      const api_url = 'http://localhost:3000/'

      const headers = { headers: { Authorization: `Bearer ${token}` } }

      await axios.post(`${api_url}users/${userId}/roles`, { role_id: roleId }, headers)
      const updatedUsers = await axios.get(`${api_url}users`, headers)

      setUsers(updatedUsers.data || [])
      setOpenDropdown(null)
    } catch (error) {
      console.error('Erro ao atualizar a role do usuário:', error)
    }
  }

  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true)

      try {
        const token = await getAccessTokenSilently()
        const api_url = 'http://localhost:3000/'

        const headers = { headers: { Authorization: `Bearer ${token}` } }

        const [responseUsers, responseRoles] = await Promise.all([
          axios.get(api_url + 'users', headers),
          axios.get(api_url + 'roles', headers)
        ])

        setUsers(responseUsers?.data || [])
        setRoles(responseRoles?.data || [])

        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    fetchAdmins()
  }, [])

  if (loading) return <div>Carregando...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mt-12 mb-4">Gestão de Funções</h2>

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

        <h2 className="text-xl font-semibold mt-12 mb-4">Gestão de Usuários</h2>
        <table className="min-w-full mb-8">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nome</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Último Login</th>
              <th className="py-2 px-4 border-b">Total de logins</th>
              <th className="py-2 px-4 border-b">Ações</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user.user_id}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b cursor-pointer hover:text-blue-600" onClick={() => handleUserClick(user.user_id)}>
                  {user.email}
                </td>
                <td className="py-2 px-4 border-b">{new Date(user.last_login).toLocaleString()}</td>
                <td className="py-2 px-4 border-b">{user.logins_count}</td>
                <td className="py-2 px-4 border-b relative">
                  <button
                    onClick={() => toggleDropdown(user.user_id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Alterar Role
                  </button>

                  {openDropdown === user.user_id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                      {roles.map(role => (
                        <button
                          key={role.id}
                          onClick={() => handleRoleChange(user.user_id, role.id)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {role.name}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin
