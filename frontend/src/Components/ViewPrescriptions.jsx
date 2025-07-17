// src/pages/ViewPrescriptions.jsx
import { useEffect, useState } from "react";
import API from "../api";
import jsPDF from "jspdf";

const ViewPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    API.get("/prescriptions")
      .then((res) => setPrescriptions(res.data))
      .catch((err) => console.error("Error fetching prescriptions"));
  }, []);

  const downloadPDF = (url) => {
    const doc = new jsPDF();
    doc.text("Prescription Details", 10, 10);
    doc.text(`Download URL: ${url}`, 10, 20);
    doc.save("prescription.pdf");
  };

  return (
    <div className="container">
      <h2>Your Prescriptions</h2>
      <ul className="list-group">
        {prescriptions.map((p) => (
          <li key={p._id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{p.fileURL}</span>
            <div>
              <a href={p.fileURL} target="_blank" rel="noreferrer" className="btn btn-sm btn-info me-2">
                View
              </a>
              <button className="btn btn-sm btn-success" onClick={() => downloadPDF(p.fileURL)}>
                Download PDF
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewPrescriptions;
