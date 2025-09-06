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

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Form />
              <Usuarios />
              <Correos />
            </>
          }
        />
        <Route path="/lista" element={<Lista />} />
      </Routes>
    </Router>
  );
}
