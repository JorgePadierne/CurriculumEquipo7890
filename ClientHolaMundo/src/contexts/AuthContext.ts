import { createContext } from 'react';

// Tipos para la autenticación
export interface User {
  email: string;
  nombre?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
}

// Crear el contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
