import { Router } from "express";
import {
  createReviewHandler,
  deleteReviewHandler,
  getAllHijabs,
  getAllReviewsHandler,
  getSingleReview,
  updateReviewHandler,
} from "../controllers/reviewsController.js"; 
import { middlewareToProtect } from "../middlewares/authMiddleware.js";

const router = Router();
router.get("/",getAllHijabs)
//  Add a review to a hijab style
router.get("/:hijabId/reviews/:reviewId", getSingleReview);
router.post("/:hijabId/reviews",middlewareToProtect, createReviewHandler);

//  Get all reviews for a hijab style
router.get("/:hijabId/reviews", getAllReviewsHandler);

//  Update a review
router.put("/:hijabId/reviews/:reviewId",middlewareToProtect, updateReviewHandler);

//  Delete a review
router.delete("/:hijabId/reviews/:reviewId",middlewareToProtect, deleteReviewHandler);

export default router;
