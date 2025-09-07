import { Schema, Types, model } from "mongoose";

const requestSchema = new Schema(
    {
        userId: { type: Types.ObjectId, ref: "User", required: true },
        hospitalId: { type: Types.ObjectId, ref: "Hospital", required: true },
        contactInfo: { type: String, required: true }, // Email or phone
        status: { type: String, enum: ["pending", "notified"], default: "pending" },
    },
    { timestamps: true }
);

const Request = model("Request", requestSchema);
export default Request;
