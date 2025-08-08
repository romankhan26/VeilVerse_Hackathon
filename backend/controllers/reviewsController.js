import mongoose from "mongoose";
import { HijabStyle } from "../models/HijabStyles.js"; // Ensure this matches your actual filename
import User from "../models/User.js";
import { HijabStyle as Hijab } from "../models/HijabStyles.js";
export async function createReviewHandler(req, res) {
  try {
    const { description, rating, user } = req.body;

    // Validation
    if (!description || !rating || !user) {
      return res
        .status(400)
        .json({ message: "Description, rating, and user are required" });
    }
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const hijab = await HijabStyle.findById(req.params.hijabId);
    if (!hijab) {
      return res.status(404).json({ message: "Hijab style not found" });
    }

    const review = {
      description,
      rating,
      user: user._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    hijab.reviews.push(review);
    await hijab.save();

    res.status(201).json({
      message: "Review added successfully",
      review: hijab.reviews[hijab.reviews.length - 1],
    });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    res
      .status(500)
      .json({ message: "Error adding review", error: error.message });
  }
}

export const getAllReviewsHandler = async (req, res) => {
  try {
    const hijab = await HijabStyle.findById(req.params.hijabId).populate(
      "reviews.user",
      "name email"
    );

    if (!hijab) {
      return res.status(404).json({ message: "Hijab style not found" });
    }

    if (hijab.reviews.length === 0) {
      return res.status(200).json({ message: "No reviews found", reviews: [] });
    }

    res.json(hijab.reviews);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    res
      .status(500)
      .json({ message: "Error fetching reviews", error: error.message });
  }
};

export const updateReviewHandler = async (req, res) => {
  try {
    const { description, rating } = req.body;

    // Validation
    if (rating && (rating < 1 || rating > 5)) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const hijab = await HijabStyle.findById(req.params.hijabId);
    if (!hijab) {
      return res.status(404).json({ message: "Hijab style not found" });
    }

    const review = hijab.reviews.id(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Add user authorization check here
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (description) review.description = description;
    if (rating) review.rating = rating;
    review.updatedAt = new Date();

    await hijab.save();

    res.json({ message: "Review updated successfully", review });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    res
      .status(500)
      .json({ message: "Error updating review", error: error.message });
  }
};

export const deleteReviewHandler = async (req, res) => {
  try {
    const hijab = await Hijab.findById(req.params.hijabId);
    if (!hijab) return res.status(404).json({ message: "Hijab not found" });

    const review = hijab.reviews.id(req.params.reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // Only review owner can delete
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }

    // Remove from array and save
    review.deleteOne(); // ⬅ fix here
    await hijab.save();

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting review", error: err.message });
  }
};



export const getAllHijabs = async (req, res) => {
  try {
    const hijabs = await HijabStyle.find()
      .populate("reviews.user", "name email")
      .sort({ createdAt: -1 });

    res.json(hijabs);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching hijabs",
      error: error.message
    });
  }
};

export const getSingleReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    const review = await User.findById(reviewId)
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    res.status(200).json({ success: true, review });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
