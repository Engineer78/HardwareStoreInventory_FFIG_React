import '../styles/index.css'; // Ajustar la ruta si es necesario
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Usar Routes en lugar de Switch en Vite
import Header from '../components/Header'; // Asegúrate de importar Header
import LoginForm from '../components/LoginForm';
import MenuPcpal from '../components/MenuPcpal';
import Footer from './Footer';
// import UserRegistrationPage from './components/UserRegistrationPage';
// import InventoryRegistrationPage from './components/InventoryRegistrationPage';

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
    <Router>
      <Routes>
        {/* Mostrar Header global en rutas específicas */}
        <Route
          path="/login"
          element={
            <>
              {/* Header global */}
              <Header title="Bienvenidos a" subtitle="Hardware Store Inventory FFIG" />
              <LoginForm />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              {/* Header global */}
              <Header title="Bienvenidos a" subtitle="Hardware Store Inventory FFIG" />
              <LoginForm />
            </>
          }
        />
        <Route
          path="/menu-principal"
          element={<MenuPcpal />} // Header específico está dentro de MenuPcpal
        />
      </Routes>
     </Router>
     <Footer/>
  </StrictMode>
);
