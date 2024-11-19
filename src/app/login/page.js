"use client";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from './../styles/Login.module.css';
import Link from 'next/link';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login, loading, errorMessage, clearError } = useContext(AuthContext);  

  useEffect(() => {
    // Limpiar el error cuando el componente se desmonte o cuando cambie el password
    return () => {
      if (clearError) clearError();
    };
  }, [password, clearError]);

  const validatePassword = () => {
    if (!password) {
      setPasswordError('El campo contraseña es obligatorio.');
      return false;
    } else if (password.length < 3) {
      setPasswordError('La contraseña debe tener al menos 3 letras.');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) return;

    try {
      await login(username, password);
      // La redirección se maneja en el AuthContext después de un login exitoso
    } catch (error) {
      console.error('Error durante el login:', error);
      setPasswordError('Contraseña inválida'); // Mostrar error en caso de credenciales incorrectas
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
        
        <label 
          htmlFor="password" 
          className={`${styles.label} ${passwordError ? styles.errorBorder : ''}`}
        >
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {passwordError && <p className={styles.error}>{passwordError}</p>}

        <button type="submit" className={styles.button}>
          {'Ingresar'}
        </button>
      </form>
      <p className={styles.registerText}>
        ¿No tienes cuenta?{' '}
        <Link href="/register" className={styles.link}>Regístrate aquí</Link>
      </p>
    </div>
  );
}
