"use client";
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Register.module.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      // Redirigir al usuario o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error durante el registro:', error);
      // Mostrar mensaje de error al usuario
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registro de Usuario</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="name" className={styles.label}>Nombre</label>
        <input
          type="text"
          id="name"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit" className={styles.button}>Registrarse</button>
      </form>
    </div>
  );
}