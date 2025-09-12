import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Create from "./Components/services/Create.tsx";
import Lista from "./Components/services/Lista.tsx";
import NavBar from "./Components/NavBar.tsx";
import Session from "./Components/services/Session.tsx";
import ProtectedRoute from "./Components/ProtectedRoute.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { useAuth } from "./hooks/useAuth";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

// Componente para manejar la redirección de la página principal
function HomeRedirect() {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }
  
  // Si está autenticado, redirigir a la lista de tareas
  // Si no está autenticado, mostrar la página de crear usuario
  return isAuthenticated ? <Navigate to="/list" replace /> : <Create />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/signin" element={<Session />} />
            <Route
              path="/list"
              element={
                <ProtectedRoute>
                  <Lista />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
