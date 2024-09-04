/**
 * @file AuthContext.tsx
 * @desc Context for authentication state and functions. Handles logout. Upon successful login,
 * stores JWT and username in localStorage. Context is passed to all child components via AuthProvider.
 */

import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  isAuthLoading: boolean;
  login: (newToken: string, username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  username: null,
  isAuthLoading: true,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * @desc Passes localStorage JWT and username to Child react nodes.
 * Handles login and logout functions.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('jwtToken');
      const storedUsername = localStorage.getItem('username');
      if (storedToken && storedUsername) {
        setToken(storedToken);
        setUsername(storedUsername);
        setIsAuthenticated(true);
      }
      setIsAuthLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (newToken: string, newUsername: string) => {
    localStorage.setItem('jwtToken', newToken);
    localStorage.setItem('username', newUsername);
    setToken(newToken);
    setUsername(newUsername);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    setToken(null);
    setUsername(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, username, isAuthLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};