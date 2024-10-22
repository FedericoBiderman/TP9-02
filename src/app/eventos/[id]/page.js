"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../styles/EventDetails.module.css';


export default function EventDetail() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      // Simulamos un pequeño retraso para mostrar el estado de carga
      await new Promise(resolve => setTimeout(resolve, 1000));

      try {
        // Simulamos la llamada a la API
        const response = {
          data: {
            id: params.id,
            name: "David Bisbal",
            description: "David Bisbal agotó todas sus localidades para su esperado regreso y agregó una nueva fecha en Movistar Arena para 2024.",
            start_date: "2024-11-21T03:00:00.000Z",
            price: "70000",
            location_name: "Movistar Arena",
            max_capacity: "15000"
          }
        };
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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{event.name}</h1>
      <p className={styles.description}>{event.description}</p>
      <p className={styles.date}>
        Fecha: {new Date(event.start_date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <p className={styles.location}>Lugar: {event.location_name}</p>
      <p className={styles.price}>Precio: ${event.price}</p>
      <p className={styles.capacity}>Capacidad máxima: {event.max_capacity}</p>
      <Link href="/eventos" className={styles.backLink}>
        <button className={styles.backButton}>Volver a la lista de eventos</button>
      </Link>
    </div>
  );
}