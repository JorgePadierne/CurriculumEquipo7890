import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Form from "./Components/Form.tsx";
import Usuarios from "./Components/Usuarios.tsx";
import Correos from "./Components/Correos.tsx";
import Lista from "./Components/Lista.tsx";
import "./App.css";

export default function App() {
  return (
    <Router>
      <nav>
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/lista" className="nav-link">
          Lista
        </NavLink>
      </nav>

      <div className="main-container">
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-container">
                <div className="content content-form">
                  <Form />
                </div>
                <div className="content content-form">
                  <Usuarios />
                </div>
                <div className="content content-form">
                  <Correos />
                </div>
              </div>
            }
          />
          <Route
            path="/lista"
            element={
              <div className="content-tarea">
                <Lista />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
