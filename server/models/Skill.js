import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Frontend",
        "Backend",
        "Database",
        "Programming",
        "Tools",
        "Other",
      ],
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Intermediate",
    },

    icon: {
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

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;