import Link from 'next/link';
import styles from './../styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/eventos">Eventos</Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/eventos">Eventos</Link>
        <Link href="/contact">Contacto</Link>
      </nav>
      <div className={styles.userMenu}>
        <Link href="/login">Iniciar Sesión</Link>
      </div>
    </header>
  );
}