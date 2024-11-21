import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import Header from '../components/Header';
import styles from '../styles/menupcpal.module.css';

const MenuPcpal = () => {
  const navigate = useNavigate(); // Inicializa el hook de navegación
  const storedUser = JSON.parse(localStorage.getItem('user')); // Obtener el usuario desde localStorage
  const isUserAllowed = storedUser && storedUser.username !== 'admin@gmail.com'; // Deshabilitar si es el usuario admin

  const handleLogout = () => {
    localStorage.removeItem('user'); // Elimina al usuario del localStorage al hacer logout
    navigate('/login'); // Navega a la pantalla de login sin recargar la página
  };

  return (
    <div>
      <Header
        title="Menú Principal"
        subtitle="Hardware Store Inventory FFIG"
        showLogo={true} // Mostrar el logo
        showHelp={true} // Mostrar el botón de ayuda
      />
      <div className={styles['menu-principal']}>
        <div className={styles['menu-options']}>
          {/* Botón condicional (habilitado/deshabilitado) */}
          <Link
            to={isUserAllowed ? '/user-registration' : '#'}
            className={`${styles['menu-button']} ${!isUserAllowed ? styles['disabled'] : ''}`}
            onClick={(e) => {
              if (!isUserAllowed) e.preventDefault(); // Evita la navegación si está deshabilitado
            }}
          >
            Módulo registro usuarios
            <span className="material-icons">person</span>
          </Link>

          {/* Botón habilitado */}
          <Link to="/inventory-registration" className={styles['menu-button']}>
            Módulo registro inventario
            <span className="material-icons">description</span>
          </Link>
        </div>

        <div className={styles['logout-button-container']}>
          <button
            className={styles['logout-button']}
            onClick={handleLogout} // Llama a handleLogout para hacer logout
          >
            Salir
            <span className="material-icons">exit_to_app</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuPcpal;
