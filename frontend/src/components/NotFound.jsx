import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6 text-center">
      <h1 className="text-9xl font-extrabold text-teal-700 mb-6">404</h1>
      <p className="text-2xl md:text-3xl font-semibold mb-4 text-gray-700">
        Oops! Page not found.
      </p>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-teal-600 text-white rounded-md font-semibold hover:bg-teal-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
