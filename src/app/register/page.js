"use client";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from './../styles/Register.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register, getToken, loading, errorMessage, clearError } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // Redirigir si el usuario ya está autenticado
    if (getToken) {
      router.push('/eventos');
    }
  }, [getToken, router]);

  useEffect(() => {
    // Limpiar el error cuando el componente se desmonte o cuando cambien los campos
    return () => {
      if (clearError) clearError();
    };
  }, [firstName, username, password, clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(firstName, username, password);
      // La redirección se maneja en el AuthContext después de un registro exitoso
    } catch (error) {
      console.error('Error durante el registro:', error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registro</h1>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="firstName" className={styles.label}>Nombre</label>
        <input
          type="text"
          id="firstName"
          className={styles.input}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
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
          {loading ? 'Cargando...' : 'Registrarse'}
        </button>
      </form>
      <p className={styles.loginText}>
        ¿Ya tienes una cuenta?{' '}
        <Link href="/login" className={styles.link}>Inicia sesión aquí</Link>
      </p>
    </div>
  );
}