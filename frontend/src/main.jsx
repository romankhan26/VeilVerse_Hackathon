import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// main.jsx or App.jsx
import { setupAxiosInterceptors } from "./utils/axiosConfig";

setupAxiosInterceptors();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
