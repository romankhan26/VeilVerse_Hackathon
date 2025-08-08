import React from "react";
import { motion } from "framer-motion";
import { ImSpinner3 } from "react-icons/im";

const LoadingOverlay = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
      >
        <ImSpinner3 className="text-6xl text-teal-600" />
      </motion.div>
    </div>
  );
};

export default LoadingOverlay;
