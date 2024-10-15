"use client";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from './../styles/Login.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, getToken, loading, errorMessage, clearError } = useContext(AuthContext);  
  const router = useRouter();

  useEffect(() => {
    // Redirigir si el usuario ya está autenticado
    if (getToken) {
      router.push('/eventos');
    }
  }, [getToken, router]);

  useEffect(() => {
    // Limpiar el error cuando el componente se desmonte o cuando cambie el username/password
    return () => {
      if (clearError) clearError();
    };
  }, [username, password, clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      // La redirección se maneja en el AuthContext después de un login exitoso
    } catch (error) {
      console.error('Error durante el login:', error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Iniciar Sesión</h1>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="username" className={styles.label}>Email</label>
        <input
          type="email"
          id="username"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Cargando...' : 'Ingresar'}
        </button>
      </form>
      <p className={styles.registerText}>
        ¿No tienes cuenta?{' '}
        <Link href="/register" className={styles.link}>Regístrate aquí</Link>
      </p>
    </div>
  );
}