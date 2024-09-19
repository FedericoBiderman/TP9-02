"use client";

import { useEventContext } from '../../../context/EventContext';
import { useParams, useRouter } from 'next/navigation';
import styles from '../../../styles/EventDetails.module.css';

export default function EventDetail() {
  const { events } = useEventContext();
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id, 10);

  const event = events.find((event) => event.id === id);

  if (!event) {
    return <p>Evento no encontrado</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles['event-details']}>
        <h1>{event.title}</h1>
        <p className={styles.date}>Fecha: {event.date}</p>
        <p className={styles['additional-info']}>
          Aquí se mostrarán más detalles acerca de este evento. Puedes agregar
          información relevante como la ubicación, descripción del evento, o
          cualquier otro detalle importante.
        </p>
        <button onClick={() => router.push('/eventos')}>Volver a Eventos</button>
      </div>
    </div>
  );
}