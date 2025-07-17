// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const fetchData = async () => {
    const [docRes, apptRes] = await Promise.all([
      API.get("/doctors"),
      API.get("/appointments"),
    ]);
    setDoctors(docRes.data);
    setAppointments(apptRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteDoctor = async (id) => {
    try {
      await API.delete(`/doctors/${id}`);
      toast.success("Doctor deleted");
      fetchData();
    } catch {
      toast.error("Failed to delete doctor");
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <h3>Doctors</h3>
      <ul className="list-group mb-4">
        {doctors.map((doc) => (
          <li key={doc._id} className="list-group-item d-flex justify-content-between">
            <div>{doc.name} - {doc.specialization}</div>
            <button onClick={() => deleteDoctor(doc._id)} className="btn btn-danger btn-sm">
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h3>Appointments</h3>
      <ul className="list-group">
        {appointments.map((appt) => (
          <li key={appt._id} className="list-group-item">
            Doctor: {appt.doctorId?.name}, Date: {new Date(appt.date).toLocaleString()}, Status: {appt.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
