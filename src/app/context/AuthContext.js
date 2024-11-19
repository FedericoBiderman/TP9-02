"use client";

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // Requiere instalación si decides usar esta librería

export const AuthContext = createContext();

const baseURL = 'http://localhost:3000';

export function AuthProvider({ children }) {
  const [getToken, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const tokenStorage = Cookies.get('token'); // Usa Cookies en lugar de cookies() de Next.js
    if (tokenStorage) {
      setToken(tokenStorage);
    }
  }, []);

  const apiClient = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const login = async (username, password) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await apiClient.post('api/user/login', { username, password });
      const { token } = response.data;
      Cookies.set('token', token); // Almacena el token en las cookies
      setToken(token);
      router.push('/eventos');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error durante el login');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove('token'); // Elimina el token de las cookies
    setToken(null);
    router.push('/');
  };

  const register = async (first_name, last_name, username, password) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await apiClient.post('api/user/register', { first_name, last_name, username, password });
      router.push('/login');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error durante el registro');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setErrorMessage(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, register, getToken, loading, errorMessage, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}
