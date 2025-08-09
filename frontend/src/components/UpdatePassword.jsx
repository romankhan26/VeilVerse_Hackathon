import React, { useState } from "react";
import { motion } from "framer-motion";
import { postRequest } from "../utils/apiClients";
import { useLocation, useNavigate } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { ImSpinner3 } from "react-icons/im";
import { getToken } from "../utils/auth";
import { toast } from "react-toastify"; // ✅ Import toast

const UpdatePassword = () => {
     const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const query_token = queryParams.get("token");

  const handleResetPswd = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const token =
        location.pathname === "/reset-password" ? query_token : getToken();

      const data = await postRequest(
        `${import.meta.env.VITE_BACKEND_URL}/auth/reset-password`,
        { token, password }
      );

      setPassword("");
      setConfirmPassword("");
      setError("");

      toast.success(data?.message || "Password updated successfully!"); // ✅ Toast

      navigate("/login");
    } catch (e) {
      console.log("Reset Password Failed: ", e.message);
      toast.error(e.response?.data?.message || "Password reset failed."); // ✅ Toast
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (password !== value) {
      setError("Passwords do not match.");
    } else {
      setError("");
    }
  };


  return (
 <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl mx-auto"
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center text-transparent bg-gradient-to-tr from-teal-300 to-teal-950 bg-clip-text uppercase font-bold">
          {location.pathname === "/reset-password"
            ? "RESET PASSWORD"
            : "UPDATE PASSWORD"}
        </h1>

        <form onSubmit={handleResetPswd} className="space-y-4">
          <div className="relative">
            <input
              name="password"
              value={password}
              required
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword1 ? "text" : "password"}
              className="w-full px-4 py-2 border-none bg-gray-400/20 rounded-lg focus:outline-none focus:shadow-teal-700/80 shadow-xs"
              placeholder="New Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword1(!showPassword1)}
              className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-600 hover:text-teal-700"
            >
              {showPassword1 ? (
                <LuEye className="text-teal-700 cursor-pointer" />
              ) : (
                <LuEyeClosed className="cursor-pointer" />
              )}
            </button>
          </div>

          <div className="relative">
            <input
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={handleConfirmPassword}
              type={showPassword2 ? "text" : "password"}
              className="w-full px-4 py-2 border-none bg-gray-400/20 rounded-lg focus:outline-none focus:shadow-teal-700/80 shadow-xs"
              placeholder="Confirm Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword2(!showPassword2)}
              className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-600 hover:text-teal-700"
            >
              {showPassword2 ? (
                <LuEye className="text-teal-700 cursor-pointer" />
              ) : (
                <LuEyeClosed className="cursor-pointer" />
              )}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full px-4 py-2 cursor-pointer text-white bg-gradient-to-br from-teal-300 to-teal-950 hover:from-teal-250 hover:to-teal-900 rounded-md flex justify-center items-center transition-transform transform hover:scale-105 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
              >
                <ImSpinner3 className="text-lg" />
              </motion.div>
            ) : location.pathname === "/reset-password" ? (
              "RESET"
            ) : (
              "UPDATE"
            )}
          </button>
        </form>
      </motion.div>
    
  )
}

export default UpdatePassword