"use client";

import { useRouter } from 'next/navigation';
import styles from '../styles/EventCard.module.css';

export default function EventCard({ event }) {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/detalleEventostitle=${encodeURIComponent(event.title)}&date=${encodeURIComponent(event.date)}`);
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Event Title</h2>
      <p className={styles.text}>Event description goes here.</p>
      <button className={styles.button} onClick={handleViewDetails}>
        Ver Detalles
      </button>
    </div>
  );
}