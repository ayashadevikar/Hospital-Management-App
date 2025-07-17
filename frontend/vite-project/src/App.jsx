
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import BookAppointment from "./Components/BookAppointment";
import Dashboard from "./Components/Dashboard";
import PrescriptionView from "./Components/PrescriptionView";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/book/:id" element={<BookAppointment />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/prescriptions" element={<PrescriptionView />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;