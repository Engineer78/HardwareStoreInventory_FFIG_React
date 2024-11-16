import { useState } from "react";
import styles from "../styles/loginform.module.css"; // Importación de módulos CSS
import "material-icons/iconfont/material-icons.css"; // Importar Material Icons 

export function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    // Obtén el usuario almacenado en localStorage
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && username === savedUser.username && password === savedUser.password) {
      console.log("¡Inicio de sesión exitoso! Bienvenido:", username);
    } else {
      console.error("Nombre de usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className={styles["form-wrapper"]}>
      <form className={styles["login-form"]} onSubmit={handleLogin}>
        <h2>Inicio de sesión</h2>
        <p>Por favor logearse para continuar.</p>
        
        <label htmlFor="username">Usuario</label>
        <input
          type="email"
          id="username"
          placeholder="jujo_systemsoft@gmail.com"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Actualiza el estado del usuario
        />

        <label htmlFor="password">Contraseña</label>
        <div className={styles["password-container"]}>
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
          />
          <span
            className={styles["toggle-password"]}
            onClick={togglePasswordVisibility}
            title={passwordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            <span className="material-icons">
              {passwordVisible ? "visibility_off" : "visibility"}
            </span>
          </span>
        </div>

        <button type="submit" className={styles["submit-button"]}>
          Ingresar
          <span className="material-icons" style={{ marginLeft: "0.5rem" }}>
            login
          </span>
        </button>

        <a href="https://www.gmail.com" className={styles["forgot-password"]}>
          ¿Olvidó su contraseña? <span>Clic aquí</span> para recuperarla.
        </a>
      </form>
    </div>
  );
}











