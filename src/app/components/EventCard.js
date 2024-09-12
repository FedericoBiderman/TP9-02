"use client";

import { useRouter } from 'next/navigation';
import styles from '../styles/EventCard.module.css';

export default function EventCard({ event }) {
  const router = useRouter();

  const handleViewDetails = () => {
    // Navegar a la ruta dinámica usando el ID del evento
    router.push(`/eventos/${event.id}`);
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{event.title}</h2>
      <p className={styles.text}>{event.date}</p>
      <button className={styles.button} onClick={handleViewDetails}>
        Ver Detalles
      </button>
    </div>
  );
}