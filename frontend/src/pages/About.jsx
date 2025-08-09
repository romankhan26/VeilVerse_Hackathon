import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-12">
      <motion.div
        className="max-w-4xl bg-white rounded-xl shadow-lg p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold text-teal-700 mb-6 text-center">
          About Us
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Welcome to our Hijab Styles Collection! We are passionate about showcasing
          beautiful, modern, and traditional hijab styles tailored for all occasions.
          Our mission is to empower individuals with versatile and elegant choices
          that reflect personal style and culture.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          This platform provides detailed tutorials, material recommendations, and
          user reviews to help you find the perfect hijab style that fits your needs.
          We believe in community and encourage users to share their experiences and
          feedback.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          Thank you for being a part of our journey. If you have any questions or
          suggestions, feel free to contact us!
        </p>
      </motion.div>
    </div>
  );
};

export default About;
