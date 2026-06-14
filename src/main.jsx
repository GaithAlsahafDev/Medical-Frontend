import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainApp from './MainApp.jsx' // قمنا بتغيير الاستيراد هنا

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainApp />
  </StrictMode>,
)