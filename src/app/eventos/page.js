"use client";

import EventList from './../components/EventList';
import styles from './../styles/EventCard.module.css';

export default function Eventos() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Eventos</h1>
      <EventList />
    </div>
  );
}