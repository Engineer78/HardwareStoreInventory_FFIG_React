import { Link } from 'react-router-dom';
import Header from '../components/Header';
import styles from '../styles/menupcpal.module.css';

const MenuPcpal = () => {
  return (
    <div>
      <Header
        title="Menú Principal "
        subtitle="Hardware Store Inventory FFIG"
        showLogo={true} // Mostrar el logo
        showHelp={true} // Mostrar el botón de ayuda
      />
      <div className={styles['menu-principal']}>
        <div className={styles['menu-options']}>
          <Link to="/user-registration" className={styles['menu-button']}>
            <span className="material-icons">person</span>
            Módulo registro usuarios
          </Link>
          <Link to="/inventory-registration" className={styles['menu-button']}>
            Módulo registro inventario
          </Link>
        </div>
        <div className={styles['logout-button-container']}>
          <button className={styles['logout-button']} onClick={() => alert('Salir')}>
            Salir
            <span className="material-icons">exit_to_app</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuPcpal;
