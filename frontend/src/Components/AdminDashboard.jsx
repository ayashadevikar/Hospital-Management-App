// src/pages/AdminDashboard.jsx (Doctor Management Part)
import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ name: "", specialization: "", availability: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchDoctors = async () => {
    const res = await API.get("/doctors");
    setDoctors(res.data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/doctors/${editingId}`, form);
        toast.success("Doctor updated");
      } else {
        await API.post("/doctors", form);
        toast.success("Doctor added");
      }
      setForm({ name: "", specialization: "", availability: "" });
      setEditingId(null);
      fetchDoctors();
    } catch (err) {
      toast.error("Error saving doctor");
    }
  };

  const handleEdit = (doctor) => {
    setForm(doctor);
    setEditingId(doctor._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await API.delete(`/doctors/${id}`);
      toast.success("Doctor deleted");
      fetchDoctors();
    }
  };

  return (
    <div className="container mt-4">
      <h3>Manage Doctors</h3>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Doctor Name"
          className="form-control mb-2"
          required
        />
        <input
          value={form.specialization}
          onChange={(e) => setForm({ ...form, specialization: e.target.value })}
          placeholder="Specialization"
          className="form-control mb-2"
          required
        />
        <input
          value={form.availability}
          onChange={(e) => setForm({ ...form, availability: e.target.value })}
          placeholder="Availability"
          // (e.g. Mon-Fri 9AM-5PM)
          className="form-control mb-2"
          required
        />
        <button className="btn btn-success" type="submit">
          {editingId ? "Update Doctor" : "Add Doctor"}
        </button>
      </form>

      <ul className="list-group">
        {doctors.map((doc) => (
          <li key={doc._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{doc.name}</strong> - {doc.specialization} ({doc.availability})
            </div>
            <div>
              <button onClick={() => handleEdit(doc)} className="btn btn-sm btn-warning me-2">Edit</button>
              <button onClick={() => handleDelete(doc._id)} className="btn btn-sm btn-danger">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
