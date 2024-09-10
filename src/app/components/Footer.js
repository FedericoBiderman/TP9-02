import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© 2024 Eventos. Todos los derechos reservados.</p>
      <div className={styles.socials}>
        <a href="https://twitter.com">Twitter</a>
        <a href="https://facebook.com">Facebook</a>
        <a href="https://instagram.com">Instagram</a>
      </div>
    </footer>
  );
}
