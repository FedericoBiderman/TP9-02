"use client";

import Link from 'next/link';
import styles from '../styles/EventCard.module.css';

export default function EventCard({ event }) {
  // Asegúrate de que event.start_date es una cadena de fecha válida
  const date = event.start_date ? new Date(event.start_date) : null;
  const formattedDate = date && !isNaN(date.getTime()) 
    ? date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Fecha no disponible';

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{event.name || 'Evento sin nombre'}</h2>
      <p className={styles.text}>{formattedDate}</p>
      <Link href={`http://localhost:3000/api/event/${event.id}`} passHref>
        <button className={styles.button}>Ver Detalles</button>
      </Link>
    </div>
  );
}