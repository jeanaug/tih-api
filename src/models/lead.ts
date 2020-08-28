import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true, required: true },
});

export const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);
