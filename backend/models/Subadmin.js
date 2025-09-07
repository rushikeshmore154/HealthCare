import { Schema, Types,model } from "mongoose";

const subAdminSchema = new Schema(
    {
        hospitalId: { type: Types.ObjectId, ref: "Hospital", required: true },
        name: { type: String, required: true },
        role: { type: String, enum: ["bed_manager", "patient_manager"], required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

const SubAdmin = model("SubAdmin", subAdminSchema);
export default SubAdmin;
