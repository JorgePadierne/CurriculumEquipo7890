import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AuthContext, type AuthContextType, type User, type AuthState } from './AuthContext.ts';

// Props para el proveedor
interface AuthProviderProps {
  children: ReactNode;
}

// Componente proveedor del contexto
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
  });

  // Verificar si hay datos de autenticación guardados al cargar la app
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedToken = localStorage.getItem('authToken');
        const savedUser = localStorage.getItem('userData');
        
        if (savedToken && savedUser) {
          setAuthState({
            isAuthenticated: true,
            user: JSON.parse(savedUser),
            token: savedToken,
            loading: false,
          });
        } else {
          setAuthState(prev => ({ ...prev, loading: false }));
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    };

    checkAuth();
  }, []);

  // Función para iniciar sesión
  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch('http://localhost:5290/api/usuario/iniciarsesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: email, Password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Si el login es exitoso
        const userData = { email, nombre: data.nombre || email };
        const token = data.token || 'dummy-token'; // Ajusta según tu backend

        // Guardar en localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));

        // Actualizar estado
        setAuthState({
          isAuthenticated: true,
          user: userData,
          token,
          loading: false,
        });

        return { success: true };
      } else {
        // Si hay error en el login
        return { 
          success: false, 
          message: data.message || 'Credenciales incorrectas' 
        };
      }
    } catch (error) {
      console.error('Error en login:', error);
      return { 
        success: false, 
        message: 'Error de conexión. Inténtalo de nuevo.' 
      };
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
    });
  };

  // Función para actualizar usuario
  const setUser = (user: User) => {
    setAuthState((prev: AuthState) => ({ ...prev, user }));
    localStorage.setItem('userData', JSON.stringify(user));
  };

  // Función para actualizar token
  const setToken = (token: string) => {
    setAuthState((prev: AuthState) => ({ ...prev, token }));
    localStorage.setItem('authToken', token);
  };

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    setUser,
    setToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

