import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Form from "./Components/Form";
import Usuarios from "./Components/Usuarios";
import Correos from "./Components/Correos";
import Lista from "./Components/Lista";
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

      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="content content-form">
                  <Form />
                </div>
                <div className="content content-form">
                  <Usuarios />
                </div>
                <div className="content content-form">
                  <Correos />
                </div>
              </>
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
