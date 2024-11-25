import { useState } from "react";
import Header from "./Header"; // Asegúrate de que Header está funcionando correctamente.
import styles from "../styles/merchandisequery.module.css"; // Verifica la ruta correcta.
import { Link } from 'react-router-dom';

const MerchandiseQuery = () => {
  // Paso 1: Definir el estado 'activeTab' para manejar la pestaña activa
  const [activeTab, setActiveTab] = useState("registro"); // Valor inicial es 'registro'

  // Paso 2: Definir la función 'handleTabClick' para actualizar el estado
  const handleTabClick = (tab) => {
    setActiveTab(tab); // Actualiza el estado 'activeTab' con el valor de la pestaña seleccionada
  };

  // Contenido principal del componente
  return (
    <div className={styles.container}>
      {/* Header del módulo */}
      <Header
        title="Módulo de consulta de mercancía"
        subtitle="Hardware Store Inventory FFIG"
        showLogo={true}
        showHelp={true}
      />

      {/* Pestañas debajo del header */}
      <div className={styles.tabs}>
        {/* Enlace para "Registro de Mercancía" */}
        <Link
          to="/inventory-registration"
          className={`${styles.tabButton} ${activeTab === "registro" ? styles.active : ""}`}
          onClick={() => handleTabClick("registro")} // Llamamos a 'handleTabClick' con el valor 'registro'
        >
          Registro de Mercancía
        </Link>

        {/* Enlace para "Consulta de Mercancía" */}
        <Link
          to="/merchandise-query"
          className={`${styles.tabButton} ${activeTab === "consulta" ? styles.active : ""}`}
          onClick={() => handleTabClick("consulta")} // Llamamos a 'handleTabClick' con el valor 'consulta'
        >
          Consulta de Mercancía
        </Link>

        {/* Enlace para "Actualizar Mercancía" */}
        <Link
          to="/actualizar"
          className={`${styles.tabButton} ${activeTab === "actualizar" ? styles.active : ""}`}
          onClick={() => handleTabClick("actualizar")} // Llamamos a 'handleTabClick' con el valor 'actualizar'
        >
          Actualizar Mercancía
        </Link>

        {/* Enlace para "Eliminar Mercancía" */}
        <Link
          to="/eliminar"
          className={`${styles.tabButton} ${activeTab === "eliminar" ? styles.active : ""}`}
          onClick={() => handleTabClick("eliminar")} // Llamamos a 'handleTabClick' con el valor 'eliminar'
        >
          Eliminar Mercancía
        </Link>
      </div>

      {/* Contenedor principal del contenido */}
      <div className={styles.content}>
        {/* Texto de instrucciones */}
        <p className={styles.instruction}>
          Ingrese un dato en la casilla correspondiente para realizar la consulta
        </p>

        {/* Tabla de inventario */}
        <div className={styles.tableContainer}>
          <table className={styles.inventoryTable}>
            <thead>
              <tr>
                <th>Selección</th>
                <th>Código</th>
                <th>Categoría</th>
                <th>Nombre del producto</th>
                <th>Existencias</th>
                <th>Valor U x producto</th>
                <th>Valor total producto</th>
                <th>Proveedor</th>
                <th>NIT Proveedor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>21</td>
                <td>Alum...</td>
                <td>Teja ajover 3 mts</td>
                <td>
                  <input type="text" value="3" />
                </td>
                <td>$84.900</td>
                <td>$254.700</td>
                <td>AJOVER</td>
                <td>12345678-01</td>
              </tr>
              {/* Agrega más filas aquí según sea necesario */}
            </tbody>
          </table>
        </div>

        {/* Botones de acción */}
        <div className={styles.buttonsContainer}>
          <button className={`${styles.button} ${styles.exportButton}`}>
            Exportar
          </button>
          <button className={`${styles.button} ${styles.printButton}`}>
            Imprimir
          </button>
          <div className={styles.actionButtons}>
            <button className={`${styles.button} ${styles.searchButton}`}>
              Buscar
            </button>
            <button className={`${styles.button} ${styles.clearButton}`}>
              Limpiar
            </button>
            <button className={`${styles.button} ${styles.exitButton}`}>
              Salir
            </button>
          </div>
        </div>
      </div>
      <p>Este es un texto de prueba para verificar el renderizado.</p>
    </div>
  );
};

export default MerchandiseQuery;
