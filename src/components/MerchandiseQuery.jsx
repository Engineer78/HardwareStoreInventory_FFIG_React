import { useState, useEffect } from 'react';
import Header from './Header';
import styles from '../styles/merchandisequery.module.css';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';

// Función para cargar productos desde localStorage
const loadProducts = () => JSON.parse(localStorage.getItem('products')) || [];

// Función para cargar proveedores desde localStorage
const loadSuppliers = () => JSON.parse(localStorage.getItem('suppliers')) || [];

const MerchandiseQuery = () => {
  const [activeTab, setActiveTab] = useState('consulta');
  const [data, setData] = useState([]); // Almacena los datos combinados y filtrados
  const [filters, setFilters] = useState({
    codigo: '',
    categoria: '',
    nombre: '',
    nit: '',
    proveedor: '',
    existencia: '',
    valorUnitario: '',
    valorTotal: '',
  }); // Filtros del usuario

  const [disabledInputs, setDisabledInputs] = useState({
    // Estado para inputs deshabilitados
    existencias: '',
    valorUnitario: '',
    valorTotal: '',
    proveedor: '',
    nitProveedor: '',
  });
  const [modalImage, setModalImage] = useState(null); // Estado para la imagen de la ventana flotante

  // Estado para el modal de búsqueda avanzada
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Cargar datos combinados al montar el componente
  useEffect(() => {
    const products = loadProducts();
    const suppliers = loadSuppliers();

    const combinedData = products.map((product) => {
      const supplier =
        suppliers.find((sup) => sup.id === product.supplierId) || {};
      return {
        ...product,
        supplierName: supplier.name || '',
        supplierNIT: supplier.nit || '',
      };
    });

    setData(combinedData); // Inicializa con todos los datos
  }, []);

  // Controlar cuántos elementos se muestran y si se está cargando más información.
  const [visibleItems, setVisibleItems] = useState(6); // Número de productos visibles inicialmente
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Para saber si se está cargando más productos

  const handleLoadMore = () => {
    if (!isLoadingMore) {
      // Evita que el usuario haga clic múltiples veces si ya se están cargando más datos
      setIsLoadingMore(true);
      setVisibleItems((prevVisibleItems) => prevVisibleItems + 20); // Aumenta el número de productos visibles
    }
  };

  useEffect(() => {
    console.log('Filtros actuales:', filters); // Verifica los filtros activos

    const products = loadProducts();
    const suppliers = loadSuppliers();

    const combinedData = products.map((product) => {
      const supplier =
        suppliers.find((sup) => sup.id === product.supplierId) || {};
      return {
        ...product,
        supplierName: supplier.name || '',
        supplierNIT: supplier.nit || '',
      };
    });

    // Verificamos si hay algún filtro activo
    const hasActiveFilters = Object.values(filters).some(
      (value) => value !== '',
    );

    // Si hay filtros activos, aplicamos el filtro
    const filteredData = combinedData.filter((item) => {
      const matchesCode =
        filters.codigo === '' ||
        item.code.toLowerCase().includes(filters.codigo.toLowerCase());
      const matchesCategory =
        filters.categoria === '' ||
        item.category.toLowerCase().includes(filters.categoria.toLowerCase());
      const matchesName =
        filters.nombre === '' ||
        item.name.toLowerCase().includes(filters.nombre.toLowerCase());
      const matchesNIT =
        filters.nit === '' ||
        item.supplierNIT.toLowerCase().includes(filters.nit.toLowerCase());
      const matchesSupplier =
        filters.proveedor === '' ||
        item.supplierName
          .toLowerCase()
          .includes(filters.proveedor.toLowerCase());
      const matchesQuantity =
        filters.existencia === '' ||
        item.quantity.toString().includes(filters.existencia);
      const matchesUnitValue =
        filters.valorUnitario === '' ||
        item.unitValue.toString().includes(filters.valorUnitario);
      const matchesTotalValue =
        filters.valorTotal === '' ||
        item.totalValue.toString().includes(filters.valorTotal);

      return (
        matchesCode &&
        matchesCategory &&
        matchesName &&
        matchesNIT &&
        matchesSupplier &&
        matchesQuantity &&
        matchesUnitValue &&
        matchesTotalValue
      );
    });

    // console.log('Datos después de aplicar filtros:', filteredData); // Verifica los datos después del filtro

    // Limita la cantidad de productos visibles según el estado visibleItems
    const itemsToShow = filteredData.slice(0, visibleItems); // Muestra solo los primeros "visibleItems"

    // Actualiza los datos de la tabla con los elementos filtrados y limitados
    setData(itemsToShow);

    // Actualiza los inputs deshabilitados si hay resultados filtrados
    if (hasActiveFilters && itemsToShow.length > 0) {
      const firstItem = itemsToShow[0]; // Toma el primer registro filtrado
      setDisabledInputs({
        existencias: firstItem.quantity || '',
        valorUnitario: firstItem.unitValue || '',
        valorTotal: firstItem.totalValue || '',
        proveedor: firstItem.supplierName || '',
        nitProveedor: firstItem.supplierNIT || '',
      });
    } else {
      // Si no hay resultados filtrados, vaciar los inputs deshabilitados
      setDisabledInputs({
        existencias: '',
        valorUnitario: '',
        valorTotal: '',
        proveedor: '',
        nitProveedor: '',
      });
    }
  }, [filters, visibleItems]); // Este efecto ahora se ejecuta cuando cambian los filtros o el número de items visibles

  const handleClear = () => {
    setFilters({
      codigo: '',
      categoria: '',
      nombre: '',
      nit: '',
      proveedor: '',
      existencia: '',
      valorUnitario: '',
      valorTotal: '',
    }); // Limpia todos los filtros

    setDisabledInputs({
      existencias: '',
      valorUnitario: '',
      valorTotal: '',
      proveedor: '',
      nitProveedor: '',
    }); // Limpia también los inputs deshabilitados

    // Restablece los datos a su estado inicial sin filtros
    const products = loadProducts();
    const suppliers = loadSuppliers();
    const combinedData = products.map((product) => {
      const supplier =
        suppliers.find((sup) => sup.id === product.supplierId) || {};
      return {
        ...product,
        supplierName: supplier.name || '',
        supplierNIT: supplier.nit || '',
      };
    });
    setData(combinedData); // Restablece los datos a su estado original
    setIsSearching(false); // Restablecer el estado de búsqueda
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));

    // Si el usuario empieza a buscar, activamos la visualización del cuerpo
    if (!isSearching) setIsSearching(true);
  };

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const [isSearching, setIsSearching] = useState(false); // Estado para controlar si el usuario está buscando

  // Función para abrir el modal de búsqueda avanzada
  const openAdvancedSearchModal = () => {
    setIsAdvancedSearchOpen(true); // Cambia el estado para abrir el modal
  };

  // Función para cerrar el modal de búsqueda avanzada
  const closeAdvancedSearchModal = () => {
    setIsAdvancedSearchOpen(false); // Cambia el estado para cerrar el modal
  };

  // Función para limpiar los filtros del modal búsqueda avanzada
  const handleClearModalFilters = () => {
    setFilters({
      codigo: '',
      categoria: '',
      nombre: '',
      nit: '',
      proveedor: '',
      existencia: '',
      valorUnitario: '',
      valorTotal: '',
    }); // Limpia los filtros
  
    setDisabledInputs({
      existencias: '',
      valorUnitario: '',
      valorTotal: '',
      proveedor: '',
      nitProveedor: '',
    }); // Limpia los campos deshabilitados
  
    setData([]); // Oculta las celdas vaciando la tabla
    setIsSearching(false); // Asegura que no se está en estado de búsqueda
  };  

  // Este useEffect se ejecuta cuando cambian isSearching, data o visibleItems
  useEffect(() => {
    // console.log('isSearching:', isSearching);
    // console.log('data.length:', data.length);
    // console.log('visibleItems:', visibleItems);
    // console.log('Mostrar botón:', isSearching && data.length > visibleItems);
  }, [isSearching, data, visibleItems]);

  // Otro useEffect ya existente en tu código
  // useEffect(() => {
  //   console.log('Datos iniciales:', data);
  //   console.log('Estado inicial de isSearching:', isSearching);
  // }, []);

  // useEffect(() => {
  //   console.log('Contenido actual del localStorage:', localStorage.getItem('products'));
  //   console.log('Contenido actual del localStorage:', localStorage.getItem('suppliers'));
  // }, []);

  return (
    <div className={styles.scrollContainer}>
      {/*Reutilizando el componenete Header.jsx de forma dinamica mediante routes-Dom.js*/}
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
          className={`${styles.tabButton} ${
            activeTab === 'registro' ? styles.active : ''
          }`}
          onClick={() => handleTabClick('registro')}
        >
          Registro de Mercancía
        </Link>

        <Link
          to="/merchandise-query"
          className={`${styles.tabButton} ${
            activeTab === 'consulta' ? styles.active : ''
          }`}
          onClick={() => handleTabClick('consulta')}
        >
          Consulta de Mercancía
        </Link>

        <Link
          to="/update-merchandise"
          className={`${styles.tabButton} ${
            activeTab === 'actualizar' ? styles.active : ''
          }`}
          onClick={() => handleTabClick('actualizar')}
        >
          Actualizar Mercancía
        </Link>

        <Link
          to="/Eliminar"
          className={`${styles.tabButton} ${
            activeTab === 'eliminar' ? styles.active : ''
          }`}
          onClick={() => handleTabClick('eliminar')}
        >
          Eliminar Mercancía
        </Link>
      </div>
      {/* Contenido dependiendo de la pestaña activa */}
      <div className={styles.container}>
        <h2 className={styles.title}>
          Ingrese un dato en la casilla correspondiente para realizar la
          consulta
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
              <input
                type="text"
                name="codigo"
                value={filters.codigo} // Vincula el valor con el estado de los filtros
                onChange={handleInputChange}
                placeholder="Buscar"
                style={{ fontStyle: 'italic' }} // Esto aplica directamente el estilo en línea
              />
            </th>
            <th>
              Categoría
              <input
                type="text"
                name="categoria"
                value={filters.categoria} // Vincula el valor con el estado de los filtros
                onChange={handleInputChange}
                placeholder="Buscar"
                style={{ fontStyle: 'italic' }} // Esto aplica directamente el estilo en línea
              />
            </th>
            <th>
              Nom. del producto
              <input
                type="text"
                name="nombre"
                value={filters.nombre} // Vincula el valor con el estado de los filtros
                onChange={handleInputChange}
                placeholder="Buscar"
                style={{ fontStyle: 'italic' }} // Esto aplica directamente el estilo en línea
              />
            </th>
            <th>
              Existencias
              <input
                type="text"
                name="Existencia"
                value={disabledInputs.existencias}
                disabled
              />
            </th>
            <th>
              Valor Unitario
              <input
                type="text"
                name="valor unitario"
                value={disabledInputs.valorUnitario}
                disabled
              />
            </th>
            <th>
              Valor Total prod.
              <input
                type="text"
                name="valor total"
                value={disabledInputs.valorTotal}
                disabled
              />
            </th>
            <th>
              Proveedor
              <input
                type="text"
                name="proveedor"
                value={disabledInputs.proveedor}
                disabled
              />
            </th>
            <th>
              NIT Proveedor
              <input
                type="text"
                name="nit"
                value={disabledInputs.nitProveedor}
                disabled
              />
            </th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {isSearching ? (
            data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
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
                      <a href="#" onClick={() => handleImageClick(item.image)}>
                        Ver Imagen
                      </a>
                    ) : (
                      'No disponible'
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No se encontraron resultados</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan="10">Realiza una búsqueda para ver los registros</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Botón "Cargar más" */}
      {isSearching && data.length > visibleItems && (
        <div className={styles['load-more-container']}>
          <button
            className={styles['load-more-button']}
            onClick={handleLoadMore}
          >
            Cargar más
          </button>
        </div>
      )}

      {/* Mostrar indicador de carga */}
      {isLoadingMore && (
        <div className={styles['loading-spinner']}>
          <p>Cargando más productos...</p>
        </div>
      )}

      {/* Modal para mostrar la imagen */}
      {modalImage && (
        <div className={styles.modal} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Verificamos si la imagen tiene una URL válida antes de renderizar */}
            {modalImage.startsWith('data:image') ? (
              <img
                src={modalImage}
                alt="Producto"
                className={styles.modalImage}
              />
            ) : (
              <p>Imagen no disponible</p>
            )}
            <button className={styles.closeButton} onClick={closeModal}>
              X
            </button>
          </div>
        </div>
      )}

      {/* Modal de búsqueda avanzada */}
      {isAdvancedSearchOpen && (
        <div
          className={styles['advanced-search-modal']}
          onClick={closeAdvancedSearchModal}
        >
          <div
            className={styles['modalContent-advance']}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Búsqueda Avanzada</h3>

            {/* Botón de limpiar ventana modal búsqueda avanzada */}
            <div className={styles['advanced-search-modal-controls']}>
              <button
                className={styles['advanced-search-clear-button']}
                onClick={handleClearModalFilters}
              >
                Limpiar <CleaningServicesIcon style={{ marginLeft: 8 }} />
              </button>
              {/*Botón para cerrar la ventana modal Búsqueda avanzada*/}
              <button
                onClick={closeAdvancedSearchModal}
                className={styles['close-button']}
              >
                X
              </button>
            </div>

            <form className="advance-form">
              <label htmlFor="nit">NIT</label>
              <input
                type="text"
                id="nit"
                name="nit"
                value={filters.nit}
                onChange={handleInputChange}
                placeholder="Buscar por NIT"
                style={{ fontStyle: 'italic' }}
              />
              <label htmlFor="proveedor">Nombre del proveedor</label>
              <input
                type="text"
                id="proveedor"
                name="proveedor"
                value={filters.proveedor}
                onChange={handleInputChange}
                placeholder="Buscar por nombre proveedor"
                style={{ fontStyle: 'italic' }}
              />
              <label htmlFor="existencia">Existencias</label>
              <input
                type="text"
                id="existencia"
                name="existencia"
                value={filters.existencia}
                onChange={handleInputChange}
                placeholder="Buscar por existencias"
                style={{ fontStyle: 'italic' }}
              />
              <label htmlFor="valorUnitario">Valor unitario</label>
              <input
                type="text"
                id="valorUnitario"
                name="valorUnitario"
                value={filters.valorUnitario}
                onChange={handleInputChange}
                placeholder="Buscar por valor unitario"
                style={{ fontStyle: 'italic' }}
              />
              <label htmlFor="valorTotal">Valor total</label>
              <input
                type="text"
                id="valorTotal"
                name="valorTotal"
                value={filters.valorTotal}
                onChange={handleInputChange}
                placeholder="Buscar por valor total"
                style={{ fontStyle: 'italic' }}
              />
            </form>
          </div>
        </div>
      )}

      {/* Botones de acción */}
      <div className={styles.buttons}>
        {/* Botón para abrir el modal búsqueda avanzada */}
        <button
          type="button"
          onClick={openAdvancedSearchModal} // Abre el modal de búsqueda avanzada
          className={styles.button}
        >
          Buscar <SearchIcon style={{ marginLeft: 8 }} />
        </button>

        <button type="button" onClick={handleClear} className={styles.button}>
          Limpiar <CleaningServicesIcon style={{ marginLeft: 8 }} />
        </button>

        <button
          type="button"
          onClick={() => (window.location.href = '/menu-principal')}
          className={styles.button}
        >
          Salir <ExitToAppIcon style={{ marginLeft: 8 }} />
        </button>
      </div>
    </div>
  );
};

export default MerchandiseQuery;
