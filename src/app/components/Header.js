"use client";

import { useContext } from 'react';
import Link from 'next/link';
import styles from './../styles/Header.module.css';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const {logout} = useContext(AuthContext); 

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="/Logo.png" alt="Logo" className={styles.logoImage} />
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/eventos">Eventos</Link>
        <Link href="/contact">Contacto</Link>
      </nav>
      <div className={styles.userMenu}>
        <button className={styles.logoutButton} onClick={()=>logout()}>
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
}