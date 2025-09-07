import { connectToDatabase } from "../../../../utils/mongodb"
import Appointment from "../../../../models/Appointment"

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id, action } = req.query

  try {
    await connectToDatabase()

    if (action === "confirm") {
      await Appointment.findByIdAndUpdate(id, { status: "confirmed" })
    } else if (action === "cancel") {
      await Appointment.findByIdAndUpdate(id, { status: "cancelled" })
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    res.status(200).json({ message: "Appointment updated successfully" })
  } catch (error) {
    console.error("Error updating appointment:", error)
    res.status(500).json({ message: "Error updating appointment" })
  }
}

