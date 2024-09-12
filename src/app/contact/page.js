"use client";

import { useState } from 'react';
import styles from './../styles/Contact.module.css';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Aquí iría la lógica para enviar el formulario (por ejemplo, a través de una API)
    console.log('Formulario enviado:', { name, email, message });
    setSubmitted(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contacto</h1>
      {!submitted ? (
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

          <label htmlFor="message" className={styles.label}>Mensaje</label>
          <textarea
            id="message"
            className={styles.textarea}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>

          <button type="submit" className={styles.button}>Enviar</button>
        </form>
      ) : (
        <p>¡Gracias por contactarnos! Te responderemos pronto.</p>
      )}
    </div>
  );
}