// src/pages/BookAppointment.jsx
import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    API.get("/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => toast.error("Failed to fetch doctors"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/appointments", { doctorId, date });
      toast.success("Appointment booked successfully");
      setDoctorId("");
      setDate("");
    } catch (err) {
      toast.error("Failed to book appointment");
    }
  };

  return (
    <div className="container">
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Choose Doctor</label>
          <select
            className="form-select"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name} - {doc.specialization}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Select Date and Time</label>
          <input
            type="datetime-local"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary">Book</button>
      </form>
    </div>
  );
};

export default BookAppointment;
