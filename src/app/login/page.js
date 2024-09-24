"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApiService } from '../services/apiService';
import styles from './../styles/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, errorMessage, loading, clearError } = useAuth();
  const api = useApiService();

  useEffect(() => {
    // Limpiar el error cuando el componente se desmonte o cuando cambie el email/password
    return () => {
      if (clearError) clearError();
    };
  }, [email, password, clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Ejemplo de uso del servicio API después del login
      const response = await api.get('/api/user/profile');
      console.log('Perfil del usuario:', response.data);
    } catch (error) {
      console.error('Error durante el login:', error);
    }
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
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Cargando...' : 'Ingresar'}
        </button>
      </form>
      <p className={styles.registerText}>
        ¿No tienes cuenta?{' '}
        <a href="/register" className={styles.link}>Regístrate aquí</a>
      </p>
    </div>
  );
}