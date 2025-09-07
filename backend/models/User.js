import { Schema, Types, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Encrypted password
    contactNumber: { type: String, required: true },
    requests: [{ type: Types.ObjectId, ref: "Request" }], // User's requests
    appointments: [{ type: Types.ObjectId, ref: "Appointment" }], // User's appointments
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
