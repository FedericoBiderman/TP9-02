"use client";
import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Ajusta la ruta según la estructura de tu proyecto
import styles from './../styles/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, errorMessage } = useAuth(); // Obtener la función de login y el mensaje de error del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password); // Llamar a la función de login desde el contexto
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Iniciar Sesión</h1>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          type="email"
          id="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password" className={styles.label}>Contraseña</label>
        <input
          type="password"
          id="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>Ingresar</button>
      </form>
      <p className={styles.registerText}>
        ¿No tienes cuenta?{' '}
        <a href="/register" className={styles.link}>Regístrate aquí</a>
      </p>
    </div>
  );
}
