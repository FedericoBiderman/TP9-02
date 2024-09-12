"use client"; // Habilita el uso de hooks en este archivo

import { useRouter } from 'next/navigation'; // usa 'next/navigation' con el app router
import styles from '../../styles/EventDetails.module.css';

// Supongamos que estos son los eventos disponibles
const events = [
  { id: 1, title: 'Concierto de Rock', date: '10 Septiembre 2024' },
  { id: 2, title: 'Feria de Tecnología', date: '20 Octubre 2024' },
  { id: 3, title: 'Maratón de la Ciudad', date: '5 Noviembre 2024' },
];

export default function EventDetail() {
  const router = useRouter();
  const id = router.query?.id;

  // Encontrar el evento basado en el ID pasado en la URL
  const event = events.find((event) => event.id === parseInt(id, 10));

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