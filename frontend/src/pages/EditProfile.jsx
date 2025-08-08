import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { putRequest } from "../utils/apiClients";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { ImSpinner3 } from "react-icons/im";
import { IoArrowBack } from "react-icons/io5";

const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user: currentUser, refetchUser } = useCurrentUser();
  const user = currentUser?.user || {};
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        contact: user.contact || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (formData.contact && !/^[\d\s+-]+$/.test(formData.contact)) {
      newErrors.contact = "Invalid phone number format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);
    try {
      const response = await putRequest(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user._id}`,
        {
          name: formData.name,
          contact: formData.contact,
          address: formData.address
        }
      );
      
      if (response.success) {
        await refetchUser();
        setShowSuccess(true);
        toast.success("Profile updated successfully!");
        setTimeout(() => navigate(location.state?.from || "/dashboard"), 1500);
      } else {
        toast.error(response.message || "Update failed");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to update profile";
      toast.error(errorMsg);
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl relative"
      >
        {/* Back button */}
        <button
          onClick={() => navigate(location.state?.from || "/dashboard")}
          className="absolute top-4 left-4 text-gray-600 hover:text-teal-700 transition-colors"
          disabled={isLoading}
        >
          <IoArrowBack className="text-xl" />
        </button>

        <h1 className="text-2xl md:text-3xl text-center text-transparent bg-gradient-to-tr from-teal-300 to-teal-950 bg-clip-text uppercase font-bold">
          EDIT PROFILE
        </h1>

        {showSuccess ? (
          <div className="text-center py-8">
            <div className="text-green-500 text-lg mb-4">✓ Profile updated successfully!</div>
            <button
              onClick={() => navigate(location.state?.from || "/dashboard")}
              className="px-4 py-2 text-teal-700 hover:underline"
            >
              Back to dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border-none ${errors.name ? 'bg-red-100/50' : 'bg-gray-400/20'} rounded-lg focus:outline-none focus:shadow-teal-700/80 shadow-xs`}
                placeholder="Full Name *"
                required
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border-none bg-gray-400/20 rounded-lg focus:outline-none focus:shadow-teal-700/80 shadow-xs bg-gray-100"
                placeholder="Email"
                disabled
              />
              <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
            </div>

            <div className="relative">
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className={`w-full px-4 py-2 border-none ${errors.contact ? 'bg-red-100/50' : 'bg-gray-400/20'} rounded-lg focus:outline-none focus:shadow-teal-700/80 shadow-xs`}
                placeholder="Phone Number"
              />
              {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
            </div>

            <div className="relative">
              <textarea
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border-none bg-gray-400/20 rounded-lg focus:outline-none focus:shadow-teal-700/80 shadow-xs"
                placeholder="Address"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => navigate(location.state?.from || "/dashboard")}
                className="px-4 py-2 text-gray-700 hover:text-teal-700 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 cursor-pointer text-white bg-gradient-to-br from-teal-300 to-teal-950 hover:from-teal-250 hover:to-teal-900 rounded-md flex justify-center items-center transition-transform transform hover:scale-105 disabled:opacity-50"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
                  >
                    <ImSpinner3 className="text-lg" />
                  </motion.div>
                ) : (
                  "SAVE CHANGES"
                )}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default EditProfile;