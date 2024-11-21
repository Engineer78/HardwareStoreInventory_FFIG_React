import '../styles/index.css'; // Ajustar la ruta si es necesario
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Usar Routes en lugar de Switch en Vite
import Header from '../components/Header'; // Asegúrate de importar Header
import LoginForm from '../components/LoginForm';
import MenuPcpal from '../components/MenuPcpal';
import Footer from '../components/Footer';
import InventoryRegistration from '../components/InventoryRegistration'; // Asegúrate de importar el nuevo componente

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
        {/* Ruta para el Login */}
        <Route
          path="/login"
          element={
            <>
              <Header title="Bienvenidos a" subtitle="Hardware Store Inventory FFIG" />
              <LoginForm />
            </>
          }
        />
        
        {/* Ruta para la página de inicio */}
        <Route
          path="/"
          element={
            <>
              <Header title="Bienvenidos a" subtitle="Hardware Store Inventory FFIG" />
              <LoginForm />
            </>
          }
        />

        {/* Ruta para el menú principal */}
        <Route
          path="/menu-principal"
          element={<MenuPcpal />} // Header específico está dentro de MenuPcpal
        />

        {/* Ruta para el registro de inventario */}
        <Route
          path="/inventory-registration"
          element={<InventoryRegistration />} // Componente de registro de inventario
        />
      </Routes>
    </Router>
    
    {/* Footer que aparece en todas las páginas */}
    <Footer />
  </StrictMode>
);
