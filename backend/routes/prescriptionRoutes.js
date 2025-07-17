import express from "express";
import Prescription from "../models/Prescription.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  const newPrescription = new Prescription(req.body);
  await newPrescription.save();
  res.status(201).json(newPrescription);
});

router.get("/", verifyToken, async (req, res) => {
  const prescriptions = await Prescription.find().populate("appointmentId");
  res.json(prescriptions);
});

export default router;
