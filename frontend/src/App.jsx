
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CitizenDashboard from "./pages/CitizenDashboard";
import SubmitGrievance from "./pages/SubmitGrievance";
import MyGrievances from "./pages/MyGrievances";
import TrackGrievance from "./pages/TrackGrievance";
import CMODashboard from "./pages/CMODashboard";
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
        <Route
  path="/submit-grievance"
  element={<SubmitGrievance />}
  
/>
        <Route
          path="/my-grievances"
          element={<MyGrievances />}
        />
        <Route path="/track" element={<TrackGrievance />} />
        <Route path="/cmo-dashboard" element={<CMODashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
