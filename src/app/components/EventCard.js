"use client";
import Link from 'next/link';
import styles from '../styles/EventCard.module.css';

export default function EventCard({ event }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{event.title}</h2>
      <p className={styles.text}>{new Date(event.date).toLocaleDateString()}</p>
      <Link href={`http://localhost:3000/api/event/${event.id}`} passHref>
        <button className={styles.button}>Ver Detalles</button>
      </Link>
    </div>
  );
}