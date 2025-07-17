import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
  },
  fileURL: String,
  notes: String,
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;
