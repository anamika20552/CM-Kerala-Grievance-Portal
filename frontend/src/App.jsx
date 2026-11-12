
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CitizenDashboard from "./pages/CitizenDashboard";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/citizen-dashboard"
          element={<CitizenDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
