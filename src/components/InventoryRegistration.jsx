import { useState, useEffect } from "react";
import Header from "./Header"; // Importación del componente Header
import styles from "../styles/inventoryregistration.module.css"; // Importación del CSS
import SaveIcon from '@mui/icons-material/Save';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import UploadFileIcon from '@mui/icons-material/UploadFile'; // Importar el icono de cargar
import { Link } from 'react-router-dom';

const InventoryRegistration = () => {
  const [supplierName, setSupplierName] = useState("");
  const [supplierNIT, setSupplierNIT] = useState("");
  const [supplierPhone, setSupplierPhone] = useState("");
  const [supplierAddress, setSupplierAddress] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [unitValue, setUnitValue] = useState("");
  const [totalValue, setTotalValue] = useState(""); // Total Value State
  const [productImage, setProductImage] = useState(null);
  const [activeTab, setActiveTab] = useState("registro"); // Estado para la pestaña activa

  // Manejar el cambio de pestaña activa
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Calcular el valor total automáticamente
  useEffect(() => {
    if (productQuantity && unitValue) {
      const total = parseFloat(productQuantity) * parseFloat(unitValue);
      setTotalValue(total.toFixed(2)); // Ajustamos a dos decimales
    }
  }, [productQuantity, unitValue]); // Se ejecuta cuando cambian la cantidad o el valor unitario

  // Función para cargar los proveedores desde localStorage
  const loadSuppliers = () => {
    return JSON.parse(localStorage.getItem("suppliers")) || [];
  };

  // Función para cargar los productos desde localStorage
  const loadProducts = () => {
    return JSON.parse(localStorage.getItem("products")) || [];
  };

  // Función para validar si los campos están vacíos
  const validateFields = () => {
    return (
      supplierName &&
      supplierNIT &&
      supplierPhone &&
      supplierAddress &&
      productCategory &&
      productCode &&
      productName &&
      productQuantity &&
      unitValue
    );
  };

  // Función para guardar los datos en localStorage, con control de duplicidad
  const handleSave = () => {
    if (!validateFields()) {
      alert("Por favor, complete todos los campos obligatorios.");
      return; // No proceder si hay campos vacíos
    }

    const suppliers = loadSuppliers(); // Cargar lista de proveedores
    const products = loadProducts(); // Cargar lista de productos

    // Verificar si el proveedor ya existe
    const existingSupplier = suppliers.find((sup) => sup.nit === supplierNIT);
    let supplierId = null;

    if (existingSupplier) {
      supplierId = existingSupplier.id; // Si existe, se usa el ID del proveedor existente
    } else {
      // Si no existe, se crea un nuevo proveedor
      supplierId = Date.now();
      suppliers.push({
        id: supplierId,
        name: supplierName,
        nit: supplierNIT,
        phone: supplierPhone,
        address: supplierAddress,
      });
      localStorage.setItem("suppliers", JSON.stringify(suppliers)); // Guardar los proveedores actualizados
    }

    // Verificar si el código del producto ya existe para este proveedor
    const existingProduct = products.find(
      (prod) => prod.code === productCode && prod.supplierId === supplierId
    );

    if (existingProduct) {
      alert("El código del producto ya existe para este proveedor.");
      return;
    }

    // Manejo de la imagen, convertirla a base64 si está presente
    let productImageBase64 = null;
    if (productImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        productImageBase64 = reader.result; // Obtenemos la imagen como base64

        // Crear un nuevo producto con la imagen convertida a base64
        const newProduct = {
          id: Date.now(),
          supplierId,
          category: productCategory,
          code: productCode,
          name: productName,
          quantity: productQuantity,
          unitValue,
          totalValue,
          image: productImageBase64, // Guardar imagen en base64
        };

        // Guardar el nuevo producto en el localStorage
        products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(products)); // Guardar los productos actualizados
        alert("Producto registrado exitosamente.");
        handleClear(); // Limpiar formulario después de guardar
      };
      reader.readAsDataURL(productImage); // Convertimos la imagen a base64
    } else {
      // Si no hay imagen, solo guardamos el producto sin imagen
      const newProduct = {
        id: Date.now(),
        supplierId,
        category: productCategory,
        code: productCode,
        name: productName,
        quantity: productQuantity,
        unitValue,
        totalValue,
        image: null, // No hay imagen
      };

      products.push(newProduct);
      localStorage.setItem("products", JSON.stringify(products)); // Guardar los productos actualizados
      alert("Producto registrado exitosamente.");
      handleClear(); // Limpiar formulario después de guardar
    }
  };

  // Función para limpiar el formulario
  const handleClear = () => {
    setSupplierName("");
    setSupplierNIT("");
    setSupplierPhone("");
    setSupplierAddress("");
    setProductCategory("");
    setProductCode("");
    setProductName("");
    setProductQuantity("");
    setUnitValue("");
    setTotalValue(""); // Limpiar el valor total
    setProductImage(null);
  };

  useEffect(() => {
    setActiveTab("registro"); // Asegurarse de que la pestaña de registro esté activa al cargar
  }, []);

  return (
    <>
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
          to="/merchandise-query"
          className={`${styles.tabButton} ${activeTab === "consulta" ? styles.active : ""}`}
          onClick={() => handleTabClick("consulta")}
        >
          Consulta de Mercancía
        </Link>

        <Link
          to="/update-merchandise"
          className={`${styles.tabButton} ${activeTab === "actualizar" ? styles.active : ""}`}
          onClick={() => handleTabClick("actualizar")}
        >
          Actualizar Mercancía
        </Link>

        <Link
          to="/delete-merchandise"
          className={`${styles.tabButton} ${activeTab === "eliminar" ? styles.active : ""}`}
          onClick={() => handleTabClick("eliminar")}
        >
          Eliminar Mercancía
        </Link>
      </div>

      {/* Contenido dependiendo de la pestaña activa */}
      {activeTab === "registro" && (
        <div className={styles.container}>
          <h2 className={styles.title}>
            Ingrese la información solicitada para crear el registro
          </h2>

          <div className={styles.formContainer}>
            <form className={styles.formLeft}>
              <label className={styles.inputLabel}>Nombre del Proveedor:</label>
              <input
                type="text"
                placeholder="Nombre del Proveedor (Obligatorio)"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                required
                className={styles.input}
              />

              <label className={styles.inputLabel}>NIT:</label>
              <input
                type="text"
                placeholder="NIT (Obligatorio)"
                value={supplierNIT}
                onChange={(e) => setSupplierNIT(e.target.value)}
                required
                className={styles.input}
              />

              <label className={styles.inputLabel}>Teléfono:</label>
              <input
                type="text"
                placeholder="Teléfono (Obligatorio)"
                value={supplierPhone}
                onChange={(e) => setSupplierPhone(e.target.value)}
                required
                className={styles.input}
              />

              <label className={styles.inputLabel}>Dirección:</label>
              <input
                type="text"
                placeholder="Dirección (Obligatorio)"
                value={supplierAddress}
                onChange={(e) => setSupplierAddress(e.target.value)}
                required
                className={styles.input}
              />

              <label className={styles.inputLabel}>Crear categoría de la mercancía:</label>
              <input
                type="text"
                placeholder="Categoría de la mercancía (Obligatorio)"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                required
                className={styles.input}
              />

              <label className={styles.inputLabel}>Crear código del producto:</label>
              <input
                type="text"
                placeholder="Código del producto (Obligatorio)"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                required
                className={styles.input}
              />

              <label className={styles.inputLabel}>Nombre del Producto:</label>
              <input
                type="text"
                placeholder="Nombre del Producto (Obligatorio)"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                className={styles.input}
              />

              <label className={styles.inputLabel}>Cantidad:</label>
              <input
                type="number"
                placeholder="Cantidad (Obligatorio)"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
                required
                className={styles.input}
              />

              <label className={styles.inputLabel}>Valor Unitario:</label>
              <input
                type="number"
                placeholder="Valor Unitario (Obligatorio)"
                value={unitValue}
                onChange={(e) => setUnitValue(e.target.value)}
                required
                className={styles.input}
              />

              <label className={styles.inputLabel}>Valor total:</label>
              <input
                type="number"
                placeholder="Valor total"
                value={totalValue}
                disabled
                className={styles.inputValorTotal}
              />
            </form>

            <form className={styles.formRight}>
              <label id="productImageLabel" className={styles.imageLabel}>
                Imagen del producto
              </label>
              <div className={styles.imageWrapper}>
                <img
                  src={
                    productImage
                      ? URL.createObjectURL(productImage)
                      : "https://via.placeholder.com/300x400/B8B323/000000"
                  }
                  alt="Vista previa"
                  className={styles.image}
                />
                <input
                  type="file"
                  onChange={(e) => setProductImage(e.target.files[0])}
                  className={styles.fileInput}
                  id="fileInput"
                />
                <label htmlFor="fileInput" className={styles.customFileInput}>
                  Cargar Imagen <UploadFileIcon  />
                </label>
              </div>
            </form>
          </div>

          <div className={styles.buttons}>
            <button type="button" onClick={handleSave} className={styles.button}>
              Guardar <SaveIcon  />
            </button>
            <button type="button" onClick={handleClear} className={styles.button}>
              Limpiar <CleaningServicesIcon  />
            </button>
            <button
              type="button"
              onClick={() => (window.location.href = "/menu-principal")}
              className={styles.button}
            >
              Salir <ExitToAppIcon style={{ marginLeft: 8 }} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InventoryRegistration;
