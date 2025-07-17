
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctorId: 
  { 
    type: 
    mongoose.Schema.Types.ObjectId, 
    ref: "Doctor"
  },
  patientId: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
  date: Date,
  status: 
   {
     type: String, enum: ["pending", "approved", "rejected"], 
     default: "pending" 
   },
});
const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;