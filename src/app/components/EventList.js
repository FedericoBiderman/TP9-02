"use client";

import EventCard from './EventCard';
import { useEventContext } from '../context/EventContext';
import styles from '../styles/EventList.module.css';

export default function EventList() {
  const { events, loading } = useEventContext();

  if (loading) {
    return <div>Cargando eventos...</div>;
  }

  return (
    <div className={styles.eventGrid}>
      {events.length > 0 ? (
        events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))
      ) : (
        <p>No hay eventos disponibles</p>
      )}
    </div>
  );
}