import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/EventDetail.module.css';

export default function EventDetail() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { eventId } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    if (eventId) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/event/${eventId}`);
          setEvent(response.data);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching event:', err);
          setError('Error al cargar el evento. Por favor, intenta de nuevo.');
          setLoading(false);
        }
      };

      fetchEvent();
    }
  }, [eventId]);

  const handleRegister = async () => {
    if (!user) {
      alert('Por favor, inicia sesión para registrarte en este evento.');
      return;
    }

    try {
      await axios.post(`http://localhost:3000/api/event/${eventId}/register`, { userId: user.id });
      alert('Te has registrado exitosamente en este evento.');
    } catch (err) {
      console.error('Error registering for event:', err);
      alert('Hubo un error al registrarte. Por favor, intenta de nuevo.');
    }
  };

  if (loading) return <div className={styles.loading}>Cargando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!event) return <div className={styles.notFound}>No se encontró el evento</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{event.title}</h1>
      <p className={styles.date}>Fecha: {new Date(event.date).toLocaleDateString()}</p>
      <p className={styles.description}>{event.description}</p>
      {user ? (
        <button className={styles.button} onClick={handleRegister}>Registrarse al evento</button>
      ) : (
        <p className={styles.loginMessage}>
          <Link href="/login">Inicia sesión</Link> para registrarte en este evento
        </p>
      )}
    </div>
  );
}