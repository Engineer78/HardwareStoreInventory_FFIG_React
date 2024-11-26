import { useState, useEffect } from 'react';
import Header from './Header';
import styles from '../styles/merchandisequery.module.css';
import { Link } from 'react-router-dom';

// Función para cargar productos desde localStorage
const loadProducts = () => JSON.parse(localStorage.getItem('products')) || [];

// Función para cargar proveedores desde localStorage
const loadSuppliers = () => JSON.parse(localStorage.getItem('suppliers')) || [];

const MerchandiseQuery = () => {
  const [activeTab, setActiveTab] = useState("consulta");
  const [data, setData] = useState([]); // Almacena los datos combinados y filtrados
  const [filters, setFilters] = useState({ codigo: '', categoria: '', nombre: '' }); // Filtros del usuario
  const [disabledInputs, setDisabledInputs] = useState({ // Estado para inputs deshabilitados
    existencias: '',
    valorUnitario: '',
    valorTotal: '',
    proveedor: '',
    nitProveedor: ''
  });
  const [modalImage, setModalImage] = useState(null); // Estado para la imagen de la ventana flotante

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Cargar datos combinados al montar el componente
  useEffect(() => {
    const products = loadProducts();
    const suppliers = loadSuppliers();

    const combinedData = products.map(product => {
      const supplier = suppliers.find(sup => sup.id === product.supplierId) || {};
      return {
        ...product,
        supplierName: supplier.name || '',
        supplierNIT: supplier.nit || ''
      };
    });

    setData(combinedData); // Inicializa con todos los datos
  }, []);

  // Actualizar los datos filtrados y los inputs deshabilitados
  useEffect(() => {
    const products = loadProducts();
    const suppliers = loadSuppliers();

    const combinedData = products.map(product => {
      const supplier = suppliers.find(sup => sup.id === product.supplierId) || {};
      return {
        ...product,
        supplierName: supplier.name || '',
        supplierNIT: supplier.nit || ''
      };
    });

    // Aplicar filtros
    const filteredData = combinedData.filter(item =>
      item.code.toLowerCase().includes(filters.codigo.toLowerCase()) &&
      item.category.toLowerCase().includes(filters.categoria.toLowerCase()) &&
      item.name.toLowerCase().includes(filters.nombre.toLowerCase())
    );

    setData(filteredData); // Actualiza los datos de la tabla

    // Solo actualizar inputs deshabilitados si hay resultados filtrados
    if (filters.codigo || filters.categoria || filters.nombre) {
      if (filteredData.length > 0) {
        const firstItem = filteredData[0]; // Toma el primer registro filtrado
        setDisabledInputs({
          existencias: firstItem.quantity || '',
          valorUnitario: firstItem.unitValue || '',
          valorTotal: firstItem.totalValue || '',
          proveedor: firstItem.supplierName || '',
          nitProveedor: firstItem.supplierNIT || ''
        });
      } else {
        // Si no hay resultados filtrados, vaciar los inputs deshabilitados
        setDisabledInputs({
          existencias: '',
          valorUnitario: '',
          valorTotal: '',
          proveedor: '',
          nitProveedor: ''
        });
      }
    } else {
      // Si no hay filtros aplicados, mantener los inputs deshabilitados vacíos
      setDisabledInputs({
        existencias: '',
        valorUnitario: '',
        valorTotal: '',
        proveedor: '',
        nitProveedor: ''
      });
    }
  }, [filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className={styles.scrollContainer}>
      <Header
        title="Módulo registro de inventario"
        subtitle="Hardware Store Inventory FFIG"
        showLogo={true}
        showHelp={true}
      />

      {/* Pestañas debajo del header */}
      <div className={styles.tabs}>
        <Link
          to="/inventory-registration"
          className={`${styles.tabButton} ${activeTab === "registro" ? styles.active : ""}`}
          onClick={() => handleTabClick("registro")}
        >
          Registro de Mercancía
        </Link>

        <Link
          to="/inventory-registration"
          className={`${styles.tabButton} ${activeTab === "consulta" ? styles.active : ""}`}
          onClick={() => handleTabClick("consulta")}
        >
          Consulta de Mercancía
        </Link>

        <Link
          to="/inventory-registration"
          className={`${styles.tabButton} ${activeTab === "actualizar" ? styles.active : ""}`}
          onClick={() => handleTabClick("actualizar")}
        >
          Actualizar Mercancía
        </Link>

        <Link
          to="/inventory-registration"
          className={`${styles.tabButton} ${activeTab === "eliminar" ? styles.active : ""}`}
          onClick={() => handleTabClick("eliminar")}
        >
          Eliminar Mercancía
        </Link>
      </div>

      {/* Contenido dependiendo de la pestaña activa */}
      <div className={styles.container}>
        <h2 className={styles.title}>
          Ingrese un dato en la casilla correspondiente para realizar la consulta
        </h2>
      </div>

      {/* Tabla de consulta de mercancía */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              Selección
              <input type="checkbox" disabled />
            </th>
            <th>
              Código
              <input type="text" name="codigo" onChange={handleInputChange} />
            </th>
            <th>
              Categoría
              <input type="text" name="categoria" onChange={handleInputChange} />
            </th>
            <th>
              Nom. del producto
              <input type="text" name="nombre" onChange={handleInputChange} />
            </th>
            <th>
              Existencias
              <input type="text" value={disabledInputs.existencias} disabled />
            </th>
            <th>
              Valor Unitario
              <input type="text" value={disabledInputs.valorUnitario} disabled />
            </th>
            <th>
              Valor total prod.
              <input type="text" value={disabledInputs.valorTotal} disabled />
            </th>
            <th>
              Proveedor
              <input type="text" value={disabledInputs.proveedor} disabled />
            </th>
            <th>
              NIT Proveedor
              <input type="text" value={disabledInputs.nitProveedor} disabled />
            </th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td><input type="checkbox" /></td>
              <td>{item.code}</td>
              <td>{item.category}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.unitValue}</td>
              <td>{item.totalValue}</td>
              <td>{item.supplierName}</td>
              <td>{item.supplierNIT}</td>
              <td>
                {item.image ? (
                  <a href="#" onClick={() => handleImageClick(item.image)}>Ver Imagen</a>
                ) : (
                  'No disponible'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para mostrar la imagen */}
      {modalImage && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Verificamos si la imagen tiene una URL válida antes de renderizar */}
            {modalImage.startsWith("data:image") ? (
              <img src={modalImage} alt="Producto" className={styles.modalImage} />
            ) : (
              <p>Imagen no disponible</p>
            )}
            <button className={styles.closeButton} onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default MerchandiseQuery;
