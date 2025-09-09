import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from "./Components/Create.tsx";
import Lista from "./Components/Lista.tsx";
import NavBar from "./Components/NavBar.tsx";
import Session from "./Components/Session.tsx";
import "./App.css";

export default function App() {
  return (
    <Router>
      <NavBar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="/signin" element={<Session />} />
          <Route path="list" element={<Lista />} />
        </Routes>
      </div>
    </Router>
  );
}
