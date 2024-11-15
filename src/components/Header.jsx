import { useState } from "react";
import styles from "../styles/header.module.css";
import logo from '../assets/Logo Sin Fondo_FFIG.png'

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles["header-left"]}>
                <img src={logo} alt="Logo" className={styles.logo} />
            </div>
            <div className={styles["header-center"]}>
                <h1>Bienvenidos a </h1>
                <h1> Hardware Store Inventory FFIG </h1>
            </div>
            <div className={styles["header-right"]}>
                <div className={styles.dropdown}>
                    <button className={styles["help-button"]} onClick={toggleMenu}>
                        Ayuda
                    </button>
                    {isMenuOpen && (
                        <ul className={styles["dropdown-menu"]}>
                            <li><a href="#faq">Acerca de</a></li>
                            <li><a href="#contact">Manual de usuario</a></li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
};


