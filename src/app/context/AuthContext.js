"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useApiService } from '../services/apiService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {  
  const [getToken, setToken] = useState(null);  
  const api = useApiService();

  useEffect(() => {
    // Verifica si hay un token en localStorage
    const tokenStorage = localStorage.getItem('token');
    if (tokenStorage) {      
      setToken(tokenStorage)      
    } 
  }, []);

  const login = async (username, password) => {
    const response = await api.post('/api/user/login', { username, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    setToken(token)      
  };

  const logout = () => {
    console.log('borro token')
    localStorage.removeItem('token');   
    setToken(null)
  };

  const register = async (first_name, username, password) => {
    const response = await api.post('/api/user/register', { first_name, username, password });
    const { token } = response.data;
    localStorage.setItem('token', token);    
  };

  return (
    <AuthContext.Provider value={{ login, logout, register,getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

/*export function useAuth() {
  return useContext(AuthContext);
}*/