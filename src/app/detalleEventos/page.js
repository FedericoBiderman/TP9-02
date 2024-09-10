import { useRouter } from 'next/router';
import styles from './../styles/EventDetails.module.css';

export default function EventDetail() {
  const router = useRouter();
  const { title, date } = router.query;

  return (
    <div className={styles.container}>
      <div className={styles['event-details']}>
        <h1>{title}</h1>
        <p className={styles.date}>Fecha: {date}</p>
        <p className={styles['additional-info']}>
          Aquí se mostrarán más detalles acerca de este evento. Puedes agregar
          información relevante como la ubicación, descripción del evento, o
          cualquier otro detalle importante.
        </p>
        <button onClick={() => router.push('/events')}>Volver a Eventos</button>
      </div>
    </div>
  );
}
