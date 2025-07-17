import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import BookAppointment from "./Components/BookAppointment";
import ProtectedRoute from "./Components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar";
import PatientDashboard from "./Components/PatientDashboard";

<ToastContainer position="top-right" autoClose={3000} />

function App() {
  return (
   <>
    <BrowserRouter>

     <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/book"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <BookAppointment />
            </ProtectedRoute>
           
          }
        />
         <Route path="/patientDashboard" element={<PatientDashboard />} />
        {/* More routes... */}
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;