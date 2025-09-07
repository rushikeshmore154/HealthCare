import { Schema, Types,model } from "mongoose";

const appointmentSchema = new Schema(
    {
        userId: { type: Types.ObjectId, ref: "User", required: true },
        patientName: { type: String, required: true },
        hospitalId: { type: Types.ObjectId, ref: "Hospital", required: true },
        date: { type: Date, required: true },
        time: { type: String, required: true },
        status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    },
    { timestamps: true }
);

const Appointment = model("Appointment", appointmentSchema);

export default Appointment;