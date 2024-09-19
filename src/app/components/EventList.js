
"use client";
import EventCard from './EventCard';
import { useEventContext } from '../context/EventContext';
import styles from '../styles/EventList.module.css';

export default function EventList() {
  const context = useEventContext();
  const events = context?.events || [];

  return (
    <div className={styles.eventGrid}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}