import { useState } from 'react';
import Header from './Header'; // Si es necesario ajustar la ruta
import styles from '../styles/inventoryregistration.module.css'; // Ruta del archivo CSS específico

const InventoryRegistration = () => {
  // Estado para almacenar los datos del formulario
  const [supplierName, setSupplierName] = useState('');
  const [supplierNIT, setSupplierNIT] = useState('');
  const [supplierPhone, setSupplierPhone] = useState('');
  const [supplierAddress, setSupplierAddress] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productCode, setProductCode] = useState('');
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [unitValue, setUnitValue] = useState('');
  const [totalValue, setTotalValue] = useState('');
  const [productImage, setProductImage] = useState(null);

  // Maneja el guardado de los datos en localStorage
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
    localStorage.setItem('inventoryData', JSON.stringify(inventoryData));
    console.log('Registro guardado en localStorage');
  };

  // Maneja la limpieza del formulario y datos en localStorage
  const handleClear = () => {
    setSupplierName('');
    setSupplierNIT('');
    setSupplierPhone('');
    setSupplierAddress('');
    setProductCategory('');
    setProductCode('');
    setProductName('');
    setProductQuantity('');
    setUnitValue('');
    setTotalValue('');
    setProductImage(null);
    localStorage.removeItem('inventoryData');
    console.log('Formulario limpiado y datos eliminados de localStorage');
  };

  return (
    <div>
      {/* Renderiza el Header con los props necesarios */}
      <Header
        title="Módulo registro inventario"
        subtitle="Hardware Store Inventory FFIG"
        showLogo={true} // Mostrar el logo
        showHelp={true} // Mostrar el botón de ayuda
      />
      <div className={styles.container}>
        <h2>Ingrese la información solicitada para crear el registro</h2> {/* Título para el formulario */}
        <form className={styles.form}>
          {/* Campos del formulario */}
          <label>
            Nombre del Proveedor (Obligatorio):
            <input type="text" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} required />
          </label>
          <label>
            NIT (Obligatorio):
            <input type="text" value={supplierNIT} onChange={(e) => setSupplierNIT(e.target.value)} required />
          </label>
          <label>
            Teléfono (Obligatorio):
            <input type="text" value={supplierPhone} onChange={(e) => setSupplierPhone(e.target.value)} required />
          </label>
          <label>
            Dirección (Obligatorio):
            <input type="text" value={supplierAddress} onChange={(e) => setSupplierAddress(e.target.value)} required />
          </label>
          <label>
            Crear categoría de la mercancía:
            <input type="text" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} />
          </label>
          <label>
            Crear código del producto:
            <input type="text" value={productCode} onChange={(e) => setProductCode(e.target.value)} />
          </label>
          <label>
            Nombre del Producto (Obligatorio):
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
          </label>
          <label>
            Cantidad (Obligatorio):
            <input type="number" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} required />
          </label>
          <label>
            Valor Unitario (Obligatorio):
            <input type="number" value={unitValue} onChange={(e) => setUnitValue(e.target.value)} required />
          </label>
          <label>
            Valor total:
            <input type="number" value={totalValue} onChange={(e) => setTotalValue(e.target.value)} />
          </label>
          <label>
            Imagen del producto:
            <input type="file" onChange={(e) => setProductImage(e.target.files[0])} />
          </label>
          <div className={styles.buttons}>
            {/* Botones de acción */}
            <button type="button" onClick={handleSave}>Guardar</button>
            <button type="button" onClick={handleClear}>Limpiar</button>
            <button type="button" onClick={() => window.location.href = '/menu-principal'}>Salir</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryRegistration;
