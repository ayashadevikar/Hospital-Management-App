// src/pages/UploadPrescription.jsx
import { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import API from "../api";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const UploadPrescription = () => {
  const [file, setFile] = useState(null);
  const [appointmentId, setAppointmentId] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !appointmentId) return toast.error("Select a file and appointment");

    const fileRef = ref(storage, `prescriptions/${uuidv4()}_${file.name}`);
    await uploadBytes(fileRef, file);
    const fileURL = await getDownloadURL(fileRef);

    try {
      await API.post("/prescriptions", { appointmentId, fileURL });
      toast.success("Uploaded successfully");
      setFile(null);
      setAppointmentId("");
    } catch (err) {
      toast.error("Failed to upload");
    }
  };

  return (
    <div className="container">
      <h2>Upload Prescription</h2>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Appointment ID"
          value={appointmentId}
          onChange={(e) => setAppointmentId(e.target.value)}
          required
        />
        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button className="btn btn-primary">Upload</button>
      </form>
    </div>
  );
};

export default UploadPrescription;
