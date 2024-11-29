import { useState, useEffect } from "react";
import Header from "./Header";
import styles from "../styles/updatemerchandise.module.css";
import SaveIcon from "@mui/icons-material/Save";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SearchIcon from "@mui/icons-material/Search";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Link } from "react-router-dom";

const UpdateMerchandise = () => {
  const [supplierName, setSupplierName] = useState("");
  const [supplierNIT, setSupplierNIT] = useState("");
  const [supplierPhone, setSupplierPhone] = useState("");
  const [supplierAddress, setSupplierAddress] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [unitValue, setUnitValue] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productImageUrl, setProductImageUrl] = useState("");
  const [originalProductIndex, setOriginalProductIndex] = useState(-1);
  const [activeTab, setActiveTab] = useState('actualizar');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (productQuantity && unitValue) {
      const total = parseFloat(productQuantity) * parseFloat(unitValue);
      setTotalValue(total.toFixed(2));
    }
  }, [productQuantity, unitValue]);

  const loadSuppliers = () => JSON.parse(localStorage.getItem("suppliers")) || [];
  const loadProducts = () => JSON.parse(localStorage.getItem("products")) || [];

  const handleSearch = () => {
    const products = loadProducts();
    const suppliers = loadSuppliers();

    const trimmedProductCode = productCode.trim();

    let product = null;
    let supplier = null;

    if (trimmedProductCode) {
      product = products.find((prod, index) => {
        const found = prod.code.toLowerCase() === trimmedProductCode.toLowerCase();
        if (found) setOriginalProductIndex(index);
        return found;
      });
      if (product) {
        supplier = suppliers.find((sup) => sup.id === product.supplierId);
      }
    } else {
      alert("Por favor, ingrese el Código del Producto para buscar.");
      return;
    }

    if (product && supplier) {
      setSupplierName(supplier.name || "");
      setSupplierNIT(supplier.nit || "");
      setSupplierPhone(supplier.phone || "");
      setSupplierAddress(supplier.address || "");
      setProductCategory(product.category || "");
      setProductName(product.name || "");
      setProductQuantity(product.quantity || "");
      setUnitValue(product.unitValue || "");
      setProductImageUrl(product.image || "");

      alert("Datos encontrados. Puede actualizarlos ahora.");
    } else {
      alert("No se encontraron datos para el Código del Producto proporcionado.");
      setOriginalProductIndex(-1);
    }
  };
  const handleSave = () => {
    if (!validateFields()) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    const products = loadProducts();
    const suppliers = loadSuppliers();

    if (originalProductIndex === -1) {
      alert("No se encontró el producto para actualizar. Realice una búsqueda primero.");
      return;
    }

    let supplierIndex = suppliers.findIndex((sup) => sup.nit === supplierNIT);
    let supplier = suppliers[supplierIndex];

    if (!supplier) {
      supplier = {
        id: Date.now(),
        name: supplierName,
        nit: supplierNIT,
        phone: supplierPhone,
        address: supplierAddress,
      };
      suppliers.push(supplier);
    } else {
      suppliers[supplierIndex] = {
        ...supplier,
        name: supplierName,
        phone: supplierPhone,
        address: supplierAddress,
        nit: supplierNIT,
      };
    }

    // Manejo de la imagen, convertirla a base64 si está presente
    let productImageBase64 = productImageUrl;
    if (productImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        productImageBase64 = reader.result;

        const updatedProduct = {
          ...products[originalProductIndex],
          supplierId: supplier.id,
          category: productCategory,
          code: productCode,
          name: productName,
          quantity: productQuantity,
          unitValue,
          totalValue: productQuantity * unitValue,
          image: productImageBase64,
        };

        products[originalProductIndex] = updatedProduct;
        localStorage.setItem("suppliers", JSON.stringify(suppliers));
        localStorage.setItem("products", JSON.stringify(products));

        alert("Producto y proveedor actualizados exitosamente.");
        handleClear();
      };
      reader.readAsDataURL(productImage);
    } else {
      const updatedProduct = {
        ...products[originalProductIndex],
        supplierId: supplier.id,
        category: productCategory,
        code: productCode,
        name: productName,
        quantity: productQuantity,
        unitValue,
        totalValue: productQuantity * unitValue,
        image: productImageBase64,
      };

      products[originalProductIndex] = updatedProduct;
      localStorage.setItem("suppliers", JSON.stringify(suppliers));
      localStorage.setItem("products", JSON.stringify(products));

      alert("Producto y proveedor actualizados exitosamente.");
      handleClear();
    }
  };

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
    setTotalValue("");
    setProductImage(null);
    setProductImageUrl("");
  };

  useEffect(() => {
    setActiveTab('actualizar');
  }, []);
  return (
    <>
      <Header
        title="Módulo registro de inventario"
        subtitle="Hardware Store Inventory FFIG"
        showLogo={true}
        showHelp={true}
      />

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

      {activeTab === "actualizar" && (
        <div className={styles.container}>
          <h2 className={styles.title}>
            Ingrese el Código del Producto para buscar y actualizar el registro
          </h2>

          <div className={styles.formContainer}>
            <form className={styles.formLeft}>
              <label className={styles.inputLabel}>Código del Producto:</label>
              <input
                type="text"
                placeholder="Código del producto (Obligatorio)"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                required
                className={styles.input}
              />

              <button
                type="button"
                onClick={handleSearch}
                className={styles.searchButton}
              >
                Buscar <SearchIcon style={{ marginLeft: 5 }} />
              </button>

              <label className={styles.inputLabel}>Nombre del Proveedor:</label>
              <input
                type="text"
                placeholder="Nombre del Proveedor"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                className={styles.input}
                />
  
                <label className={styles.inputLabel}>NIT:</label>
                <input
                  type="text"
                  placeholder="NIT"
                  value={supplierNIT}
                  onChange={(e) => setSupplierNIT(e.target.value)}
                  className={styles.input}
                />
  
                <label className={styles.inputLabel}>Teléfono:</label>
                <input
                  type="text"
                  placeholder="Teléfono"
                  value={supplierPhone}
                  onChange={(e) => setSupplierPhone(e.target.value)}
                  className={styles.input}
                />
  
                <label className={styles.inputLabel}>Dirección:</label>
                <input
                  type="text"
                  placeholder="Dirección"
                  value={supplierAddress}
                  onChange={(e) => setSupplierAddress(e.target.value)}
                  className={styles.input}
                />
  
                <label className={styles.inputLabel}>Categoría:</label>
                <input
                  type="text"
                  placeholder="Categoría"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className={styles.input}
                />
  
                <label className={styles.inputLabel}>Nombre del Producto:</label>
                <input
                  type="text"
                  placeholder="Nombre del Producto"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className={styles.input}
                />
  
                <label className={styles.inputLabel}>Cantidad:</label>
                <input
                  type="number"
                  placeholder="Cantidad"
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                  className={styles.input}
                />
  
                <label className={styles.inputLabel}>Valor Unitario:</label>
                <input
                  type="number"
                  placeholder="Valor Unitario"
                  value={unitValue}
                  onChange={(e) => setUnitValue(e.target.value)}
                  className={styles.input}
                />
  
                <label className={styles.inputLabel}>Valor Total:</label>
                <input
                  type="text"
                  placeholder="Valor Total"
                  value={totalValue}
                  className={styles.inputValorTotal}
                  disabled
                />
              </form>
  
              <form className={styles.formRight}>
                <label id="productImageLabel" className={styles.imageLabel}>
                  Imagen del Producto
                </label>
                <div className={styles.imageWrapper}>
                  <img
                    src={productImageUrl || "https://via.placeholder.com/300x400/B8B323/000000"}
                    alt="Vista previa"
                    className={styles.image}
                  />
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setProductImage(file);
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setProductImageUrl(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className={styles.fileInput}
                    id="fileInput"
                  />
                  <label htmlFor="fileInput" className={styles.customFileInput}>
                    Cargar Imagen <UploadFileIcon style={{ marginLeft: 5 }} />
                  </label>
                </div>
              </form>
            </div>
  
            <div className={styles.actionButtons}>
              <button className={styles.saveButton} onClick={handleSave}>
                Guardar <SaveIcon />
              </button>
              <button className={styles.clearButton} onClick={handleClear}>
                Limpiar <CleaningServicesIcon />
              </button>
              <Link to="/" className={styles.exitButton}>
                Salir <ExitToAppIcon  />
              </Link>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default UpdateMerchandise;
  


