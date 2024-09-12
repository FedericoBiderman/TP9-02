"use client";
import Link from 'next/link';
import styles from './../styles/Header.module.css';

export default function Header() {
  const handleLogout = () => {
    window.location.href = '/login';  // Redirige al iniciar sesión
  };

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
        <button className={styles.logoutButton} onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
}