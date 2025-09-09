import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Sing from "./Components/Sign-in";
import Lista from "./Components/Lista.tsx";
import NavBar from "./Components/NavBar.tsx";
import "./App.css";

export default function App() {
  return (
    <Router>
      <NavBar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Sing />} />
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
