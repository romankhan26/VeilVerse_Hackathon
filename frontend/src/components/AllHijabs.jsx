import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiStar,
  FiChevronDown,
  FiChevronUp,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { ImSpinner3 } from "react-icons/im";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { postRequest, putRequest, deleteRequest } from "../utils/apiClients";
import { toast } from "react-toastify";
import useSWR from "swr";

const AllHijabs = (e) => {
  const [expandedHijab, setExpandedHijab] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [hijabs, setHijabs] = useState([]);
  const { user } = useCurrentUser();
  const navigate = useNavigate();

  // SWR hook for fetching hijabs
  const {
    data,
    error,
    mutate: mutateHijabs,
  } = useSWR(
    `${import.meta.env.VITE_BACKEND_URL}/hijabs/`,
    async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch hijabs");
      }
      return response.json();
    },
    { revalidateOnFocus: false }
  );
  //manually setting hijabs
  useEffect(() => {
    if (data) {
      setHijabs(data);
    }
  }, [data]);
  const toggleExpand = (id) => {
    setExpandedHijab(expandedHijab === id ? null : id);
    setReviewText("");
    setRating(5);
    setEditingReview(null);
  };

  //////////////////function to add reviews
  const addReview = async (hijabId) => {
    if (!user) {
      toast.error("Please login to submit a review");
      navigate("/login");
      return false;
    }
    if (!reviewText.trim()) {
      toast.error("Please enter your review");
      return false;
    }
    setSubmittingReview(true);

    try {
      const response = await postRequest(
        `${import.meta.env.VITE_BACKEND_URL}/hijabs/${hijabId}/reviews`,
        { description: reviewText, rating, user: user.user }
      );

      if (response.success) {
        // Assume response.review is the newly created review object
        setHijabs((prevHijabs) =>
          prevHijabs.map((h) =>
            h._id === hijabId
              ? { ...h, reviews: [...h.reviews, response.review] }
              : h
          )
        );
        toast.success("Review submitted successfully");
        mutateHijabs(); // Revalidate
        setReviewText("");
        setRating(5);
        return true;
      } else {
        toast.error(response.message || "Failed to submit review");
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
      return false;
    } finally {
      setSubmittingReview(false);
    }
  };
  ////////////function to edit the review
  const editReview = async (hijabId) => {
    if (!user) {
      toast.error("Please login to edit your review");
      navigate("/login");
      return false;
    }
    if (!reviewText.trim()) {
      toast.error("Please enter your review");
      return false;
    }
    setSubmittingReview(true);

    try {
      const response = await putRequest(
        `${import.meta.env.VITE_BACKEND_URL}/hijabs/${hijabId}/reviews/${
          editingReview._id
        }`,
        { description: reviewText, rating }
      );
      console.log(response, "updating review");
      console.log(hijabs, "HIjabs");

      if (response.success) {
        // Update review in local state by replacing matching review
        setHijabs((prevHijabs) =>
          prevHijabs.map((h) =>
            h._id === hijabId
              ? {
                  ...h,
                  reviews: h.reviews.map((r) =>
                    r._id === editingReview._id
                      ? { ...r, ...response.review }
                      : r
                  ),
                }
              : h
          )
        );
        toast.success("Review updated successfully");
        mutateHijabs(); // Revalidate
        setReviewText("");
        setRating(5);
        setEditingReview(null);
        return true;
      } else {
        toast.error(response.message || "Failed to update review");
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update review");
      return false;
    } finally {
      setSubmittingReview(false);
    }
  };
  /////////submit handler
  const handleReviewSubmit = async (hijabId) => {
    if (editingReview) {
      await editReview(hijabId);
    } else {
      await addReview(hijabId);
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setReviewText(review.description);
    setRating(review.rating);
  };

  const handleDeleteReview = async (hijabId, reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      const response = await deleteRequest(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/hijabs/${hijabId}/reviews/${reviewId}`,
        { user: user.user }
      );

      if (response.success) {
        toast.success("Review deleted successfully");
        mutateHijabs(); // Revalidate the data
      } else {
        toast.error(response.message || "Failed to delete review");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete review");
    }

    //     if (response.success) {
    //   setHijabs((prevHijabs) =>
    //     prevHijabs.map((h) =>
    //       h._id === hijabId
    //         ? { ...h, reviews: h.reviews.filter((r) => r._id !== reviewId) }
    //         : h
    //     )
    //   );

    //   toast.success("Review deleted successfully");
    //   mutateHijabs();
    // }
  };

  const renderStars = (num) => {
    return [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`${
          i < num ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  if (error)
    return (
      <div className="text-center py-8 text-red-500">Error loading hijabs</div>
    );
  if (!hijabs) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
        >
          <ImSpinner3 className="text-4xl text-teal-600" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        

        <div className="grid grid-cols-1 gap-6">
          {hijabs.map((hijab) => (
            <motion.div
              key={hijab._id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden md:flex border-l-8 border-l-teal-700 rounded-tl-xl rounded-bl-xl"
            >
              {/* Image and basic info section */}
              <div className="h-68 md:w-68 w-full overflow-hidden">
                <img
                  src={hijab.imageUrl || "/hijab-placeholder.jpg"}
                  alt={hijab.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex-1">
                {/* Hijab details section */}
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-gray-800">
                    {hijab.name}
                  </h2>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-800">
                    {hijab.difficultyLevel}
                  </span>
                </div>

                <p className="mt-2 text-gray-600 line-clamp-2">
                  {hijab.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {hijab.materialRecommendations.map((material, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                    >
                      {material}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => toggleExpand(hijab._id)}
                    className="text-teal-600 hover:text-teal-800 flex items-center"
                  >
                    {expandedHijab === hijab._id ? (
                      <>
                        Hide details <FiChevronUp className="ml-1" />
                      </>
                    ) : (
                      <>
                        Show details <FiChevronDown className="ml-1" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center">
                    {hijab.reviews.length > 0 && (
                      <>
                        <div className="flex mr-1">
                          {renderStars(
                            Math.round(
                              hijab.reviews.reduce(
                                (acc, curr) => acc + curr.rating,
                                0
                              ) / hijab.reviews.length
                            )
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          ({hijab.reviews.length})
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {expandedHijab === hijab._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 overflow-hidden"
                    >
                      <div className="border-t pt-4">
                        <h3 className="font-medium text-gray-800">
                          Suitable for:
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {hijab.suitableForOccasions.map((occasion, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs rounded-full bg-teal-100 text-teal-800"
                            >
                              {occasion}
                            </span>
                          ))}
                        </div>

                        <h3 className="font-medium text-gray-800 mt-4">
                          Reviews:
                        </h3>
                        {hijab.reviews.length > 0 ? (
                          <div className="space-y-3 mt-2">
                            {hijab.reviews.map((review) => (
                              <div
                                key={review._id}
                                className="border-b pb-3 last:border-0 group"
                              >
                                <div className="flex justify-between">
                                  <div className="flex items-center">
                                    <div className="flex">
                                      {renderStars(review.rating)}
                                    </div>
                                    {review.user && (
                                      <span className="ml-2 text-sm font-medium text-gray-700">
                                        {review.user.name}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-500">
                                      {new Date(
                                        review.createdAt
                                      ).toLocaleDateString()}
                                    </span>
                                    {user?.user?._id === review.user?._id && (
                                      <div className=" group-hover:opacity-100 transition-opacity flex space-x-2">
                                        <button
                                          onClick={() =>
                                            handleEditReview(review)
                                          }
                                          className="text-teal-600 hover:text-teal-800"
                                          title="Edit"
                                        >
                                          <FiEdit2
                                            size={14}
                                            className="text-teal-600 hover:text-teal-800"
                                          />
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleDeleteReview(
                                              hijab._id,
                                              review._id
                                            )
                                          }
                                          className="text-red-600 hover:text-red-800"
                                          title="Delete"
                                        >
                                          <FiTrash2 size={14} />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <p className="mt-1 text-sm text-gray-600">
                                  {review.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 mt-1">
                            No reviews yet
                          </p>
                        )}

                        <div className="mt-4">
                          <h3 className="font-medium text-gray-800 mb-2">
                            {editingReview
                              ? "Edit Your Review"
                              : "Add Your Review"}
                          </h3>
                          <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            rows="3"
                            placeholder="Share your experience with this hijab style..."
                          />
                          <div className="flex items-center mt-2">
                            <span className="mr-2 text-sm text-gray-700">
                              Rating:
                            </span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setRating(star)}
                                  className="focus:outline-none"
                                >
                                  <FiStar
                                    className={`text-xl ${
                                      star <= rating
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="flex space-x-3 mt-3">
                            <button
                              onClick={() => handleReviewSubmit(hijab._id)}
                              disabled={submittingReview}
                              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-md hover:from-teal-600 hover:to-teal-800 disabled:opacity-50 flex items-center"
                            >
                              {submittingReview ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    repeat: Infinity,
                                    ease: "linear",
                                    duration: 1,
                                  }}
                                  className="mr-2"
                                >
                                  <ImSpinner3 className="text-lg" />
                                </motion.div>
                              ) : null}
                              {editingReview
                                ? "Update Review"
                                : "Submit Review"}
                            </button>
                            {editingReview && (
                              <button
                                onClick={() => {
                                  setEditingReview(null);
                                  setReviewText("");
                                  setRating(5);
                                }}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AllHijabs;
