import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: true,
      trim: true,
    },

    institution: {
      type: String,
      required: true,
      trim: true,
    },

    field: {
      type: String,
      default: "",
      trim: true,
    },

    startYear: {
      type: String,
      default: "",
    },

    endYear: {
      type: String,
      default: "",
    },

    grade: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Education = mongoose.model("Education", educationSchema);

export default Education;