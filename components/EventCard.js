
import { useRouter } from 'next/router';
import styles from '../styles/EventCard.module.css';

export default function EventCard({ event }) {
  const router = useRouter();

  const handleViewDetails = () => {
    // Redirigir a la pantalla de detalles con el evento como parámetro
    router.push({
      pathname: '/event/detail',
      query: { title: event.title, date: event.date }
    });
  };

  return (
    <div className={styles.card}>
      <h2>{event.title}</h2>
      <p>{event.date}</p>
      <button className={styles.button} onClick={handleViewDetails}>
        Ver Detalles
      </button>
    </div>
  );
}
