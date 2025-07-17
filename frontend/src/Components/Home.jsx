// src/pages/Home.jsx
import { useEffect, useState } from "react";
import API from "../api";

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    API.get("/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error("Failed to fetch doctors", err));
  }, []);

  const filteredDoctors = doctors.filter((doc) =>
    doc.specialization.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Doctors List</h2>
      <input
        type="text"
        placeholder="Search by department/specialization"
        onChange={(e) => setFilter(e.target.value)}
        className="form-control mb-3"
      />
      <ul className="list-group">
        {filteredDoctors.map((doc) => (
          <li key={doc._id} className="list-group-item">
            <strong>{doc.name}</strong> - {doc.specialization}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
