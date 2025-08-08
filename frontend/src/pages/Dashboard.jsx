import React from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser"; // Assuming you have this hook
import { removeToken, removeUser } from "../utils/auth";

const Dashboard = () => {
  const navigate = useNavigate();
  let { user , refetchUser,error } = useCurrentUser();
  user = user.user
if (!user || error

) {
  navigate("/login")
      toast.info("You've been logged out");
  return
}
// console.log(useCurrentUser())
  const handleLogout = () => {
    removeUser();
    removeToken();
    navigate("/login");
        toast.info("You've been logged out");
  };

  const handleEditProfile = () => {
    navigate("/dashboard/update-profile");
  };

  const handleSettings = () => {
    navigate("/dashboard/account-settings");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
            <img 
              src={user?.profileImage || "profile.jpg"} 
              alt="Profile" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/default-profile.jpg";
              }}
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{user?.name || "User"}</h1>
            <p className="text-gray-600 mb-2">{user?.email || "user@example.com"}</p>
            <p className="text-gray-600">{user?.phone || "+1 (555) 000-0000"}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={handleEditProfile}
            className="px-4 py-2 cursor-pointer text-white bg-gradient-to-br from-teal-300 to-teal-950 hover:from-teal-250 hover:to-teal-900 rounded-lg transition-colors"
          >
            Edit Profile
          </button>
          <button
            onClick={handleSettings}
            className="px-4 py-2 cursor-pointer  bg-gradient-to-br from-teal-300 to-teal-950 hover:from-teal-250 hover:to-teal-900 text-white rounded-lg transition-colors"
          >
            Account Settings
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 cursor-pointer bg-gradient-to-br from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Hackathon Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Hackathon Participation</h2>
        <div className="space-y-4">
          {/* {user?.hackathons?.length > 0 ? (
            user.hackathons.map((hackathon) => (
              <div key={hackathon.id} className="border-b border-gray-200 pb-4 last:border-0">
                <h3 className="font-medium text-gray-800">{hackathon.name}</h3>
                <p className="text-sm text-gray-600">Status: {hackathon.status}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">You haven't joined any hackathons yet.</p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;