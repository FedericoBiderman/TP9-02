"use client";

import Link from 'next/link';
import styles from './styles/page.module.css';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

export default function Page() {
  const { getToken } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Bienvenido a Bedeco</h1>
        <p className={styles.description}>
          Descubre los mejores eventos de tu ciudad. Participa en conciertos, ferias, conferencias y mucho más. ¡No te lo pierdas!
        </p>
        <div className={styles.ctaButtons}>
          {getToken ? (
            <Link href="/eventos">
              <button className={styles.button}>Ver Eventos</button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <button className={styles.buttonOutline}>Iniciar Sesión</button>
              </Link>
              <Link href="/register">
                <button className={styles.buttonOutline}>Registrarse</button>
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
}