import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check auth session
  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setAdmin(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    try {
      const data = await api.getMe();
      if (data.success && data.admin) {
        setAdmin(data.admin);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('adminToken');
        setAdmin(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      localStorage.removeItem('adminToken');
      setAdmin(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Login handler
  const login = async (email, password) => {
    const data = await api.login({ email, password });
    if (data.success) {
      if (data.token) {
        localStorage.setItem('adminToken', data.token);
      }
      setAdmin(data.admin);
      setIsAuthenticated(true);
      return data;
    }
    throw new Error(data.message || 'Login failed');
  };

  // Logout handler
  const logout = async () => {
    try {
      await api.logout();
    } catch (e) {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem('adminToken');
      setAdmin(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ admin, isAuthenticated, isLoading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
