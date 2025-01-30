import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'
// import axios from 'axios'

const Admin = () => {
  const { getAccessTokenSilently } = useAuth0()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await getAccessTokenSilently()
        // const response = await axios.get('http://localhost:3000/api/admin/users', {
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        // })
        // setUsers(response.data)
        setLoading(false)
      } catch (err) {
        setError('Erro ao carregar usuários')
        setLoading(false)
      }
    }

    fetchUsers()
  }, [getAccessTokenSilently])

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      const token = await getAccessTokenSilently()
      // await axios.patch(
      //   `http://localhost:3000/api/admin/users/${userId}`,
      //   {
      //     active: !currentStatus
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`
      //     }
      //   }
      // )

      // // Atualiza a lista de usuários
      // setUsers(users.map(user => (user.id === userId ? { ...user, active: !currentStatus } : user)))
    } catch (err) {
      setError('Erro ao atualizar status do usuário')
    }
  }

  if (loading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Gestão de Usuários</h2>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button onClick={() => handleToggleUserStatus(user.id, user.active)} className="text-indigo-600 hover:text-indigo-900">
                      {user.active ? 'Desativar' : 'Ativar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Estatísticas do Sistema</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900">Total de Usuários</h3>
            <p className="text-3xl font-bold text-indigo-600">{users.length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900">Usuários Ativos</h3>
            <p className="text-3xl font-bold text-green-600">{users.filter(u => u.active).length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900">Usuários Inativos</h3>
            <p className="text-3xl font-bold text-red-600">{users.filter(u => !u.active).length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
