import { Auth0Provider } from '@auth0/auth0-react'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      authorizationParams={{ redirect_uri: origin }}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
)
