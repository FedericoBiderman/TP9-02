import EventCard from './EventCard';
import styles from '../styles/EventList.module.css';

const events = [
  { id: 1, title: 'Concierto de Rock', date: '10 Septiembre 2024' },
  { id: 2, title: 'Feria de Tecnología', date: '20 Octubre 2024' },
  { id: 3, title: 'Maratón de la Ciudad', date: '5 Noviembre 2024' },
];

export default function EventList() {
  return (
    <div className={styles.eventGrid}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
