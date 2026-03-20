import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './themes/minimal.css'
import './themes/glass.css'
import './themes/neon.css'
import './themes/retro.css'
import './themes/dark-elegance.css'
import './themes/gradient.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
