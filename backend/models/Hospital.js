import { Schema, Types, model } from "mongoose";

const hospitalSchema = new Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        contactNumber: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        totalBeds: { type: Number, required: true },
        occupiedBeds: { type: Number, required: true,default:0 },
        availableBeds: { type: Number, required: true },
        city: { type: String, required: true },
        subAdmins: [{ type: Types.ObjectId, ref: "SubAdmin" }],
        requests: [{ type: Types.ObjectId, ref: "Request" }],
        appointments: [{ type: Types.ObjectId, ref: "Appointment" }],
        rating: { type: Number, default: 0 },
        waitingTime: { type: String, default: "~20 mins" },
    },
    { timestamps: true }
);

const Hospital = model("Hospital", hospitalSchema);
export default Hospital;
