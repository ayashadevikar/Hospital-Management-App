import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  experience: { type: Number, required: true },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
