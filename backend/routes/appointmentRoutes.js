import express from "express";
import Appointment from "../models/Appointment.js";
import { verifyToken, verifyAdmin} from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  const newAppointment = new Appointment({ ...req.body, patientId: req.user.id });
  await newAppointment.save();
  res.status(201).json(newAppointment);
});

router.get("/", verifyToken, async (req, res) => {
  const filter = req.user.role === "admin" ? {} : { patientId: req.user.id };
  const appointments = await Appointment.find(filter).populate("doctorId");
  res.json(appointments);
});

export default router; 