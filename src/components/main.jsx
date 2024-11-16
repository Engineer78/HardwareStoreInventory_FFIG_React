import '../styles/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Header } from '../components/Header'
import { LoginForm } from '../components/LoginForm'

// Inicializa el usuario predeterminado en localStorage
const initializeDefaultUser = () => {
  const defaultUser = { username: 'admin@gmail.com', password: '12345' };

  if (!localStorage.getItem('user')) {
    localStorage.setItem('user', JSON.stringify(defaultUser));
  }
};

initializeDefaultUser();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <LoginForm />
  </StrictMode>,
)
