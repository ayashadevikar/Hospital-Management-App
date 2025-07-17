// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    setIsLoggedIn(!!token);
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid d-flex justify-content-between align-items-center w-100">
        <Link className="navbar-brand d-flex" to="/">🏥 HospitalApp</Link>

        <div className="d-flex justify-content-center flex-grow-1">
          <ul className="navbar-nav">
            {role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link>
              </li>
            )}

            {role === "patient" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/book-appointment">Book Appointment</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/patient-dashboard">My Appointments</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/upload-prescription">Upload Prescription</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/view-prescriptions">View Prescriptions</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="d-flex align-items-center gap-2">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="btn btn-outline-light">Login</Link>
              <Link to="/register" className="btn btn-outline-light">Register</Link>
            </>
          ) : (
            <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
