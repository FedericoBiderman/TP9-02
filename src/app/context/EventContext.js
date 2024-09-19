"use client";

import React, { createContext, useContext, useState } from 'react';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Concierto de Rock', date: '10 Septiembre 2024' },
    { id: 2, title: 'Feria de Tecnología', date: '20 Octubre 2024' },
    { id: 3, title: 'Maratón de la Ciudad', date: '5 Noviembre 2024' },
  ]);

  return (
    <EventContext.Provider value={{ events, setEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => useContext(EventContext);