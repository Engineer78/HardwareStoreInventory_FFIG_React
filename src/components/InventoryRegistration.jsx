import { useState } from "react";
import Header from "./Header"; // Importación del componente Header
import styles from "../styles/inventoryregistration.module.css"; // Importación del CSS
import SaveIcon from '@mui/icons-material/Save';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import UploadFileIcon from '@mui/icons-material/UploadFile'; // Importar el icono de cargar

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
  const [totalValue, setTotalValue] = useState("");
  const [productImage, setProductImage] = useState(null);

  const handleSave = () => {
    const inventoryData = {
      supplierName,
      supplierNIT,
      supplierPhone,
      supplierAddress,
      productCategory,
      productCode,
      productName,
      productQuantity,
      unitValue,
      totalValue,
      productImage: productImage ? URL.createObjectURL(productImage) : null,
    };
    localStorage.setItem("inventoryData", JSON.stringify(inventoryData));
    console.log("Registro guardado en localStorage");
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
    localStorage.removeItem("inventoryData");
    console.log("Formulario limpiado y datos eliminados de localStorage");
  };

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
        <button type="button" className={styles.tabButton}>
          Registro de Mercancía
        </button>
        <button type="button" className={styles.tabButton}>
          Consulta de Mercancía
        </button>
        <button type="button" className={styles.tabButton}>
          Actualizar Mercancía
        </button>
        <button type="button" className={styles.tabButton}>
          Eliminar Mercancía
        </button>
      </div>

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
              onChange={(e) => setTotalValue(e.target.value)}
              className={styles.input}
            />
          </form>

          <form className={styles.formRight}>
            <label id="productImageLabel" className={styles.imageLabel}>Imagen del producto</label>
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
                Cargar Imagen <UploadFileIcon style={{ marginLeft: 5 }} />
              </label>
              <span className={styles.fileInputLabel}>
                {productImage ? productImage.name : "Ningún archivo seleccionado"}
              </span>
            </div>
          </form>
        </div>

        <div className={styles.buttons}>
          <button type="button" onClick={handleSave} className={styles.button}>
            Guardar <SaveIcon style={{ marginLeft: 8 }} />
          </button>
          <button type="button" onClick={handleClear} className={styles.button}>
            Limpiar <CleaningServicesIcon style={{ marginLeft: 8 }} />
          </button>
          <button
            type="button"
            onClick={() => (window.location.href = "/menu-principal")}
            className={styles.button}
          >
            Salir <ExitToAppIcon style={{ marginLeft: 8, color: 'white' }} />
          </button>
        </div>
      </div>

      {/* <div className={styles.footer}>
        © 2024 Hardware Store Inventory FFIG. Todos los derechos reservados.
      </div> */}
    </>
  );
};

export default InventoryRegistration;
