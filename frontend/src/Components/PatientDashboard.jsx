// src/pages/PatientDashboard.jsx
import { useEffect, useState } from "react";
import API from "../api";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    API.get("/appointments")
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error("Error fetching appointments", err));
  }, []);

  return (
    <div className="container">
      <h2>Your Appointments</h2>
      <ul className="list-group">
        {appointments.map((appt) => (
          <li key={appt._id} className="list-group-item">
            {appt.doctorId?.name} - {new Date(appt.date).toLocaleString()} - <strong>{appt.status}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDashboard;
