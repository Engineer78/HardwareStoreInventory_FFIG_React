import { useState } from "react";
import Header from "./Header";
import styles from "../styles/inventoryregistration.module.css";
import IosShareIcon from "@mui/icons-material/IosShare";
import PrintIcon from "@mui/icons-material/Print";
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const MerchandiseQuery = () => {
  const [searchData, setSearchData] = useState({
    code: "",
    category: "",
    productName: "",
    unitValue: "",
    totalValue: "",
    provider: "",
    nit: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  return (
    <>
      {/* Header para la consulta de mercancía */}
      <Header
        title="Módulo de consulta de mercancía"
        subtitle="Hardware Store Inventory FFIG"
        showLogo={true}
        showHelp={true}
      />

      {/* Barra de pestañas */}
      <div className={styles.tabs}>
        <button className={`${styles.tabButton} ${styles.active}`}>
          Consulta de Mercancía
        </button>
      </div>

      {/* Instrucción */}
      <h2 className={styles.title}>
        Ingrese un dato en la casilla correspondiente para realizar la consulta
      </h2>

      {/* Tabla de búsqueda */}
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Selección</th>
              <th>Código</th>
              <th>Categoría</th>
              <th>Nombre del producto</th>
              <th>Existencias</th>
              <th>Valor unitario</th>
              <th>Valor total producto</th>
              <th>Proveedor</th>
              <th>NIT</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <input
                  type="text"
                  name="code"
                  value={searchData.code}
                  onChange={handleInputChange}
                  placeholder="Buscar por código"
                  className={styles.input}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="category"
                  value={searchData.category}
                  onChange={handleInputChange}
                  placeholder="Buscar por categoría"
                  className={styles.input}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="productName"
                  value={searchData.productName}
                  onChange={handleInputChange}
                  placeholder="Buscar por nombre"
                  className={styles.input}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Existencias"
                  disabled
                  className={styles.inputValorTotal}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="unitValue"
                  value={searchData.unitValue}
                  onChange={handleInputChange}
                  placeholder="Buscar por precio unitario"
                  className={styles.input}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="totalValue"
                  value={searchData.totalValue}
                  onChange={handleInputChange}
                  placeholder="Buscar por valor total"
                  className={styles.input}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="provider"
                  value={searchData.provider}
                  onChange={handleInputChange}
                  placeholder="Buscar por proveedor"
                  className={styles.input}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="nit"
                  value={searchData.nit}
                  onChange={handleInputChange}
                  placeholder="Buscar por NIT"
                  className={styles.input}
                />
              </td>
              <td>
                <span>imagen.png</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Botones inferiores */}
      <div className={styles.buttonsContainer}>
        <div className={styles.leftButtons}>
          <button className={styles.button}>
            Exportar <IosShareIcon style={{ marginLeft: 8 }} />
          </button>
          <button className={styles.button}>
            Imprimir <PrintIcon style={{ marginLeft: 8 }} />
          </button>
        </div>
        <div className={styles.rightButtons}>
          <button className={styles.button}>
            Buscar <SearchIcon style={{ marginLeft: 8 }} />
          </button>
          <button className={styles.button}>
            Limpiar <CleaningServicesIcon style={{ marginLeft: 8 }} />
          </button>
          <button
            className={styles.button}
            onClick={() => (window.location.href = "/menu-principal")}
          >
            Salir <ExitToAppIcon style={{ marginLeft: 8 }} />
          </button>
        </div>
      </div>
    </>
  );
};

export default MerchandiseQuery;
