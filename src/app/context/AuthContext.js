"use client"; // Esto convierte el archivo en un Client Component

import { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto fácilmente en otros componentes
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null); // Estado para almacenar el token
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const baseUrl = 'https://welcome-chamois-aware.ngrok-free.app'; // URL de la API

  // Función para manejar el login
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${baseUrl}/api/user/login`, {
        username: email,
        password: password,
      });

      if (response.data.success) {
        // Almacenar el token en el estado y redirigir al usuario
        setToken(response.data.token);
        router.replace('/eventos');
      } else {
        setErrorMessage('Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Hubo un problema al intentar iniciar sesión.');
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setToken(null);
    router.replace('/login');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};
