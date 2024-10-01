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
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`/api/event/${id}`);
          setEvent(response.data);
          setLoading(false);
        } catch (err) {
          setError('Error al cargar el evento');
          setLoading(false);
        }
      };

      fetchEvent();
    }
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!event) return <div>No se encontró el evento</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{event.title}</h1>
      <p className={styles.date}>{event.date}</p>
      <p className={styles.description}>{event.description}</p>
      {user ? (
        <button className={styles.button}>Registrarse al evento</button>
      ) : (
        <p>Inicia sesión para registrarte en este evento</p>
      )}
    </div>
  );
}