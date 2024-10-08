"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApiService } from '../services/apiService';
import styles from '../styles/Register.module.css';
import Link from 'next/link';

export default function Register() {
  const [first_name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register, errorMessage, loading, clearError } = useAuth();
  const api = useApiService();

  useEffect(() => {
    // Limpiar el error cuando el componente se desmonte o cuando cambien los campos
    return () => {
      if (clearError) clearError();
    };
  }, [first_name, username, password, clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(first_name, username, password);
      // Ejemplo de uso del servicio API después del registro
      const response = await api.get('/api/user/profile');
      console.log('Perfil del usuario:', response.data);
      // Redirigir al usuario a la página principal o de perfil
      window.location.href = '/login';
    } catch (error) {
      console.error('Error durante el registro:', error);
      // El manejo de errores se realiza en el contexto de autenticación
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registro de Usuario</h1>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="first_name" className={styles.label}>Nombre</label>
        <input
          type="text"
          id="first_name"
          className={styles.input}
          value={first_name}
          onChange={(e) => setName(e.target.value)}
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
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
      <p className={styles.loginText}>
        ¿Ya tienes una cuenta?{' '}
        <Link href="/login" className={styles.link}>Inicia sesión aquí</Link>
      </p>
    </div>
  );
}