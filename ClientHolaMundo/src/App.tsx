import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from "./Components/services/Create.tsx";
import Lista from "./Components/services/Lista.tsx";
import NavBar from "./Components/NavBar.tsx";
import Session from "./Components/services/Session.tsx";
import ProtectedRoute from "./Components/ProtectedRoute.tsx";
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
