import { useState, useEffect } from 'react';
import Header from './Header';
import styles from '../styles/deletemerchandise.module.css';
import { Link } from 'react-router-dom';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// Función para cargar productos desde localStorage
const loadProducts = () => JSON.parse(localStorage.getItem('products')) || [];

// Función para cargar proveedores desde localStorage
const loadSuppliers = () => JSON.parse(localStorage.getItem('suppliers')) || [];

const DeleteMerchandise = () => {
    const [activeTab, setActiveTab] = useState('eliminar');
    const [data, setData] = useState([]); // Almacena los datos combinados y filtrados
    const [filters, setFilters] = useState({
        codigo: '',
        // categoria: '',
        // nombre: '',
        // nit: '',
        // proveedor: '',
        // existencia: '',
        // valorUnitario: '',
        // valorTotal: '',
    });// Filtros del usuario

    const [disabledInputs, setDisabledInputs] = useState({
        // Estado para inputs deshabilitados
        categoria: '',
        nombre: '',
        existencias: '',
        valorUnitario: '',
        valorTotal: '',
        proveedor: '',
        nitProveedor: '',
    });
    const [modalImage, setModalImage] = useState(null); // Estado para la imagen de la ventana flotante

    // Estado para el modal de confirmacion eliminación de registro
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

    // Estado para controlar si el usuario está buscando
    const [isSearching, setIsSearching] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    // Controlar cuántos elementos se muestran y si se está cargando más información.
    const [visibleItems, setVisibleItems] = useState(10); // Número de productos visibles inicialmente
    const [isLoadingMore, setIsLoadingMore] = useState(false); // Para saber si se está cargando más productos

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    // Función para abrir el modal de confirmación de eliminación de registro
    const openDeleteConfirmationModal = () => {
        setIsDeleteConfirmationOpen(true);// Cambia el estado para abrir el modal
    };

    // Función para cerrar el modal de confirmación de eliminación de registro
    const closeDeleteConfirmationModal = () => {
        setIsDeleteConfirmationOpen(false);// Cambia el estado para cerrar el modal
    };

    //función para utilización de los checkBox
    const handleCheckboxChange = (e, item) => {
        if (e.target.checked) {
            setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
        } else {
            setSelectedItems((prevSelectedItems) =>
                prevSelectedItems.filter((selected) => selected.code !== item.code)
            );
        }
    };

    const handleDeleteItems = () => {
        if (selectedItems.length === 0) {
          alert('Por favor, selecciona al menos un registro para eliminar.');
          return;
        }
      
        const remainingItems = data.filter(
          (item) => !selectedItems.some((selected) => selected.code === item.code)
        );
      
        // Actualiza el localStorage
        localStorage.setItem('products', JSON.stringify(remainingItems));
      
        // Actualiza el estado de los datos
        setData(remainingItems);
      
        // Cierra el modal y limpia la selección
        closeDeleteConfirmationModal();
        setSelectedItems([]);
      };   

    const handleLoadMore = () => {
        if (!isLoadingMore) {
            setIsLoadingMore(true);
            setVisibleItems((prevVisibleItems) => prevVisibleItems + 30);
            setIsLoadingMore(false); // Esto puede ser manejado con un setTimeout para simular la carga de datos.
        }
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

        setData(combinedData);// Inicializa con todos los datos
    }, []);

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

        // Verificamos si hay algún filtro activo
        const hasActiveFilters = Object.values(filters).some(
            (value) => value !== '',
        );

        const filteredData = hasActiveFilters
            ? combinedData.filter(
                (item) =>
                    item.code.toLowerCase().includes(filters.codigo.toLowerCase()),
                    // item.category
                    //     .toLowerCase()
                    //     .includes(filters.categoria.toLowerCase()) &&
                    // item.name.toLowerCase().includes(filters.nombre.toLowerCase()) &&
                    // item.supplierNIT
                    //     .toLowerCase()
                    //     .includes(filters.nit.toLowerCase()) &&
                    // item.supplierName
                    //     .toLowerCase()
                    //     .includes(filters.proveedor.toLowerCase()) &&
                    // (item.quantity.toString().includes(filters.existencia) ||
                    //     filters.existencia === '') &&
                    // (item.unitValue.toString().includes(filters.valorUnitario) ||
                    //     filters.valorUnitario === '') &&
                    // (item.totalValue.toString().includes(filters.valorTotal) ||
                    //     filters.valorTotal === ''),
            )
            : []; // Si no hay filtros, no mostramos nada

        // Limita la cantidad de productos visibles según el estado visibleItems
        const itemsToShow = filteredData.slice(0, visibleItems); // Muestra solo los primeros "visibleItems"

        // Actualiza los datos de la tabla con los elementos filtrados y limitados
        setData(itemsToShow);

        // Actualiza los inputs deshabilitados si hay resultados filtrados
        if (hasActiveFilters && itemsToShow.length > 0) {
            const firstItem = itemsToShow[0]; // Toma el primer registro filtrado
            setDisabledInputs({
                categoria: firstItem.category || '',
                nombre: firstItem.name || '',
                existencias: firstItem.quantity || '',
                valorUnitario: firstItem.unitValue || '',
                valorTotal: firstItem.totalValue || '',
                proveedor: firstItem.supplierName || '',
                nitProveedor: firstItem.supplierNIT || '',
            });
        } else {
            // Si no hay resultados filtrados, vaciar los inputs deshabilitados
            setDisabledInputs({
                categoria: '',
                nombre: '',
                existencias: '',
                valorUnitario: '',
                valorTotal: '',
                proveedor: '',
                nitProveedor: '',
            });// Limpia todos los filtros
        }
    }, [filters, visibleItems]); // Este efecto ahora se ejecuta cuando cambian los filtros o el número de items visibles


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));

        if (name === 'codigo' && value === '') {
            setData([]);
            setDisabledInputs({
                categoria: '',
                nombre: '',
                existencias: '',
                valorUnitario: '',
                valorTotal: '',
                proveedor: '',
                nitProveedor: '',
            });// Limpia también los inputs deshabilitados
        }

        if (!isSearching) setIsSearching(true);
    };

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
            categoria: '',
            nombre: '',
            existencias: '',
            valorUnitario: '',
            valorTotal: '',
            proveedor: '',
            nitProveedor: '',
        });// Limpia también los inputs deshabilitados

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
        setData(combinedData);// Restablece los datos a su estado original
        setIsSearching(false);// Restablecer el estado de búsqueda
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

            <div className={styles.tabs}>
                <Link
                    to="/inventory-registration"
                    className={`${styles.tabButton} ${activeTab === 'registro' ? styles.active : ''
                        }`}
                    onClick={() => handleTabClick('registro')}
                >
                    Registro de Mercancía
                </Link>
                <Link
                    to="/merchandise-query"
                    className={`${styles.tabButton} ${activeTab === 'consulta' ? styles.active : ''
                        }`}
                    onClick={() => handleTabClick('consulta')}
                >
                    Consulta de Mercancía
                </Link>
                <Link
                    to="/update-merchandise"
                    className={`${styles.tabButton} ${activeTab === 'actualizar' ? styles.active : ''
                        }`}
                    onClick={() => handleTabClick('actualizar')}
                >
                    Actualizar Mercancía
                </Link>
                <Link
                    to="/delete-merchandise"
                    className={`${styles.tabButton} ${activeTab === 'eliminar' ? styles.active : ''
                        }`}
                    onClick={() => handleTabClick('eliminar')}
                >
                    Eliminar Mercancía
                </Link>
            </div>

            <div className={styles.container}>
                <h2 className={styles.title}>
                    Ingrese un código de producto para realizar la búsqueda, luego seleccione la casilla que contiene el registro que desea eliminar.
                </h2>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Selección
                            <input
                                type="checkbox"
                                disabled />
                        </th>
                        <th>Código
                            <input
                                type="text"
                                name="codigo"
                                value={filters.codigo}
                                onChange={handleInputChange}
                                placeholder="Buscar"
                                style={{ fontStyle: 'italic' }} />
                        </th>
                        <th>Categoría
                            <input
                                type="text"
                                name="categoria"
                                value={disabledInputs.categoria}
                                disabled />
                        </th>
                        <th>Nom. del producto
                            <input
                                type="text"
                                name="nombre"
                                value={disabledInputs.nombre}
                                disabled />
                        </th>
                        <th>Existencias
                            <input
                                type="text"
                                name="existencia"
                                value={disabledInputs.existencias}
                                disabled /></th>
                        <th>Valor Unitario
                            <input
                                type="text"
                                name="valorUnitario"
                                value={disabledInputs.valorUnitario}
                                disabled />
                        </th>
                        <th>Valor Total prod.
                            <input
                                type="text"
                                name="valorTotal"
                                value={disabledInputs.valorTotal}
                                disabled /></th>
                        <th>Proveedor
                            <input
                                type="text"
                                name="proveedor"
                                value={disabledInputs.proveedor}
                                disabled />
                        </th>
                        <th>NIT Proveedor
                            <input
                                type="text"
                                name="nitProveedor"
                                value={disabledInputs.nitProveedor}
                                disabled />
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
                                        <input
                                            type="checkbox"
                                            onChange={(e) => handleCheckboxChange(e, item)}
                                        />
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
            {data.length > visibleItems && !isLoadingMore && (
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

            {/* Modal de confirmación de eliminación */}
            {isDeleteConfirmationOpen && (
                <div
                    className={styles['delete-confirmation-modal']}
                    onClick={closeDeleteConfirmationModal}
                >
                    <div
                        className={styles['modalContent-delete']}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>Confirmar Eliminación</h3>
                        <p>¿Estás seguro de que desea eliminar los registros seleccionados?</p>

                        <div className={styles['delete-confirmation-modal-controls']}>
                            <button
                                onClick={handleDeleteItems}
                                className={styles['delete-button']}
                            >
                                Eliminar <DeleteOutlineIcon style={{ marginLeft: 1 }}/>
                            </button>
                            <button
                                onClick={closeDeleteConfirmationModal}
                                className={styles['close-button']}
                            >
                                Cancelar X
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Botones de acción */}
            <div className={styles.buttons}>
                <button
                    type="button"
                    onClick={openDeleteConfirmationModal} // Abre el modal de confirmación de eliminación
                    className={styles.button}
                >
                    Eliminar <DeleteOutlineIcon style={{ marginLeft: 8 }} />
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

export default DeleteMerchandise;
