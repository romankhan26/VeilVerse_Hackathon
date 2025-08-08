import React from "react";

const NotificationPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      {/* Centered heading */}
      <h1 className="text-4xl font-bold text-teal-700 mb-10">
        Notifications
      </h1>

      {/* Static layout container */}
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8 flex items-center justify-center">
        <p className="text-gray-500 text-lg">No new updates</p>
      </div>
    </div>
  );
};

export default NotificationPage;
