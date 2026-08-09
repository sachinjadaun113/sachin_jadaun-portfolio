import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    visitorId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    name: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;