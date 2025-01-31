import { useState, useEffect } from 'react'
import axios from 'axios'

import { useAuth } from '../hooks/useAuth'

const Admin = () => {
  const { getAccessTokenSilently } = useAuth()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = await getAccessTokenSilently()
        const response = await axios.get('http://localhost:3000/admin', { headers: { Authorization: `Bearer ${token}` } })
        console.log({ response })

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
        <h2 className="text-xl font-semibold mb-4">Gestão de Usuários</h2>
      </div>
    </div>
  )
}

export default Admin
