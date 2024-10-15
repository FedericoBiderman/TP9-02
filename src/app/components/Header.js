"use client";

import { useContext } from 'react';
import Link from 'next/link';
import styles from './../styles/Header.module.css';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const { getToken, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="/Logo.png" alt="Logo" className={styles.logoImage} />
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        {getToken && <Link href="/eventos">Eventos</Link>}
        <Link href="/contact">Contacto</Link>
      </nav>
      <div className={styles.userMenu}>
        {getToken ? (
          <button className={styles.logoutButton} onClick={logout}>
            Cerrar Sesión
          </button>
        ) : (
          <Link href="/login">
            <button className={styles.loginButton}>Iniciar Sesión</button>
          </Link>
        )}
      </div>
    </header>
  );
}