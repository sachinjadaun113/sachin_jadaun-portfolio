import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    startDate: {
      type: String,
      default: "",
    },

    endDate: {
      type: String,
      default: "",
    },

    currentlyWorking: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    technologies: {
      type: [String],
      default: [],
    },

    companyUrl: {
      type: String,
      default: "",
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

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;