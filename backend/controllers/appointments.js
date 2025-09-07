import Appointment from "../models/Appointment.js";
import Hospital from "../models/Hospital.js";
import User from "../models/User.js";

// 📌 Book an Appointment
export const bookAppointment = async (req, res) => {
  try {
    const { patientName, hospitalId, date, time } = req.body;
    const userId = req.user.id;

    if (!patientName || !hospitalId || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const al = await Appointment.find({ date, time, hospitalId });
    if (al.length > 0) {
      return res
        .status(400)
        .json({ message: "Appointment not available for this date and time" });
    }

    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    const appointment = new Appointment({
      userId,
      patientName,
      hospitalId,
      date,
      time,
    });

    await appointment.save();
    res
      .status(201)
      .json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Get all appointments of a user
export const getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId", userId);
    const appointments = await Appointment.find({ userId }).populate(
      "hospitalId",
      "name location"
    );

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Get all appointments for a specific hospital
export const getHospitalAppointments = async (req, res) => {
  try {
    if (req.user.role !== "hospital" && req.user.role !== "subAdmin") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const hospitalId = req.user.id;

    const appointments = await Appointment.find({ hospitalId });
    appointments.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Cancel an Appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const userId = req.user.id;

    const appointment = await Appointment.findOne({
      _id: appointmentId,
      hospitalId: userId,
    });
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await Appointment.findByIdAndDelete(appointmentId);
    res.status(200).json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Confirm an Appointment (Admin Only)
export const confirmAppointment = async (req, res) => {
  try {
    if (req.user.role !== "hospital" && req.user.role !== "subAdmin") {
      console.log(req.user.role);
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "confirmed";
    await appointment.save();

    res.status(200).json({ message: "Appointment confirmed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
