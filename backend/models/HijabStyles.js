import mongoose from "mongoose";
import  User  from "./User.js"; // <-- make sure User model is registered

const { Schema } = mongoose;

// Review Schema
const reviewSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
});

// Hijab Style Schema
const hijabStyleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  difficultyLevel: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Medium"
  },
  materialRecommendations: [String],
  suitableForOccasions: [String],
  imageUrl: String,
  reviews: [reviewSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const HijabStyle = mongoose.model("HijabStyle", hijabStyleSchema);
