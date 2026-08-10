import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["certificate", "achievement", "other"],
      required: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    issuer: {
      type: String,
      default: "",
      trim: true,
    },

    date: {
      type: String,
      default: "",
      trim: true,
    },

    url: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model("Document", documentSchema);

export default Document;