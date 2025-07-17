import express from "express";
import Doctor from "../models/Doctor.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  const newDoctor = new Doctor(req.body);
  await newDoctor.save();
  res.status(201).json(newDoctor);
});

router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  const updated = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.json({ message: "Doctor deleted" });
});

export default router;
