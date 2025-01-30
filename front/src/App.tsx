import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import NavBar from './components/NavBar'
import Admin from './pages/Admin'
import User from './pages/User'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute requiredRole="admin">
              <Admin />
            </PrivateRoute>
          }
        />

        <Route
          path="/user"
          element={
            <PrivateRoute requiredRole="user">
              <User />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
