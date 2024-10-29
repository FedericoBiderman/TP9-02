"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import styles from '../../styles/EventDetails.module.css';

export default function EventDetail() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    console.log(params.id);
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/event/${params.id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Error al cargar el evento. Por favor, intenta de nuevo.');
        setLoading(false);
      }
    };

    if (params.id) {
      fetchEvent();
    }
  }, [params.id]);

  if (loading) return <div className={styles.loading}>Cargando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!event) return <div className={styles.notFound}>No se encontró el evento</div>;

  const formattedDate = event.start_date ? new Date(event.start_date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'Fecha no disponible';

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{event.name}</h1>
      <p className={styles.description}>{event.description}</p>
      <p className={styles.date}>Fecha: {formattedDate}</p>
      <p className={styles.location}>Lugar: {event.location_name}</p>
      <p className={styles.price}>Precio: ${event.price}</p>
      <p className={styles.capacity}>Maxima asistencia: {event.max_assistance}</p>
      <Link href="/eventos" className={styles.backLink}>
        <button className={styles.backButton}>Volver a la lista de eventos</button>
      </Link>
    </div>
  );
}