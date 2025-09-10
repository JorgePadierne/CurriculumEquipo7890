import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from "./components/services/Create.tsx";
import Lista from "./components/services/Lista.tsx";
import NavBar from "./components/NavBar.tsx";
import Session from "./components/services/Session.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import "./App.css";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Create />} />
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
