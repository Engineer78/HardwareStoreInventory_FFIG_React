import  { useState } from 'react';
import styles from '../styles/inventoryregistration.module.css';

const InventoryRegistration = () => {
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
    <div className={styles.container}>
      <h2>Módulo registro de inventario Hardware Store Inventory FFIG</h2>
      <form className={styles.form}>
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
          <button type="button" onClick={handleSave}>Guardar</button>
          <button type="button" onClick={handleClear}>Limpiar</button>
          <button type="button" onClick={() => window.location.href = '/menu-principal'}>Salir</button>
        </div>
      </form>
    </div>
  );
};

export default InventoryRegistration;
