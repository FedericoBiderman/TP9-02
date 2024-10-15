"use client";

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

const baseURL = 'http://localhost:3000';

export function AuthProvider({ children }) {
  const [getToken, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const tokenStorage = localStorage.getItem('token');
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
      const response = await apiClient.post('/api/user/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
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
    localStorage.removeItem('token');
    setToken(null);
    router.push('/');
  };

  const register = async (first_name, username, password) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await apiClient.post('/api/user/register', { first_name, username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
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