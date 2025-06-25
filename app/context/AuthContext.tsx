'use client';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { fetchLogin } from '../utils/axios';

interface AuthContextProps {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // При монтировании читаем токен из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('token');
    if (saved) setToken(saved);
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const data = await fetchLogin({ username, password });
    setToken(data.access);
    localStorage.setItem('token', data.access);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  // Пока инициализируется auth–статус — можно показать спиннер
  if (loading) return <p>Инициализация...</p>;

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
