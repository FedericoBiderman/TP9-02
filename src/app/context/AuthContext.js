"use client";

import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const baseUrl = 'http://localhost:3000';

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (authToken) => {
    try {
      const response = await axios.get(`${baseUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      logout();
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/api/user/login`, {
        username: email,
        password: password,
      });

      if (response.data.success) {
        const authToken = response.data.token;
        setToken(authToken);
        localStorage.setItem('authToken', authToken);
        await fetchUserData(authToken);
        router.replace('/eventos');
      } else {
        setErrorMessage('Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Hubo un problema al intentar iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    router.replace('/login');
  }, [router]);

  const clearError = useCallback(() => {
    setErrorMessage('');
  }, []);

  const getToken = useCallback(() => token, [token]);

  return (
    <AuthContext.Provider value={{
      token,
      user,
      login,
      logout,
      loading,
      errorMessage,
      clearError,
      getToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};