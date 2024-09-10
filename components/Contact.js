
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
      <h1>Contacto</h1>
      {!submitted ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>

          <button type="submit">Enviar</button>
        </form>
      ) : (
        <p>¡Gracias por contactarnos! Te responderemos pronto.</p>
      )}
    </div>
  );
}
