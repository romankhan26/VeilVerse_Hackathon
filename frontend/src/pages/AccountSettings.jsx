import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { putRequest, deleteRequest } from '../utils/apiClients';
import { removeToken, removeUser } from '../utils/auth';
import { toast } from 'react-toastify';
import { motion } from "framer-motion";
import { ImSpinner3 } from "react-icons/im";
import { IoArrowBack } from "react-icons/io5";
import UpdatePassword from '../components/UpdatePassword';

const AccountSettings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, refetchUser } = useCurrentUser();
  const [activeTab, setActiveTab] = useState('password');
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [error, setError] = useState('');

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'DELETE') {
      setError("Please type 'DELETE' to confirm");
      return;
    }

    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      return;
    }

    setLoading(true);
    try {
      const response = await deleteRequest(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user._id}`
      );

      if (response.success) {
        toast.success("Account deleted successfully");
        handleLogout();
      } else {
        setError(response.message || "Failed to delete account");
        toast.error(response.message || "Failed to delete account");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to delete account";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate('/login');
    toast.info("You've been logged out");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Back button */}
      <button
        onClick={() => navigate(location.state?.from || "/dashboard")}
        className="flex items-center text-gray-600 hover:text-teal-700 mb-4 transition-colors"
      >
        <IoArrowBack className="mr-1" /> Back to Dashboard
      </button>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full md:w-48 flex-shrink-0"
        >
          <div className="bg-white rounded-lg shadow-sm p-2">
            <button
              onClick={() => setActiveTab('password')}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                activeTab === 'password' 
                  ? 'bg-teal-50 text-teal-600 font-medium' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Password
            </button>
            <button
              onClick={() => {
                setActiveTab('danger');
                setError('');
                setDeleteConfirm('');
              }}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                activeTab === 'danger' 
                  ? 'bg-red-50 text-red-600 font-medium' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Danger Zone
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          {activeTab === 'password' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <UpdatePassword />
            </div>
          )}

          {activeTab === 'danger' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full p-6 space-y-6"
              >
                <h2 className="text-2xl text-center text-transparent bg-gradient-to-tr from-red-400 to-red-800 bg-clip-text uppercase font-bold">
                  DELETE ACCOUNT
                </h2>

                <div className="space-y-4">
                  <p className="text-gray-600 text-center">
                    This will permanently delete your account and all associated data. 
                    This action cannot be undone.
                  </p>

                  <div className="relative">
                    <input
                      name="deleteConfirm"
                      value={deleteConfirm}
                      onChange={(e) => {
                        setDeleteConfirm(e.target.value);
                        if (error) setError('');
                      }}
                      type="text"
                      className={`w-full px-4 py-2 border-none ${
                        error ? 'bg-red-100/50' : 'bg-gray-400/20'
                      } rounded-lg focus:outline-none focus:shadow-red-700/80 shadow-xs`}
                      placeholder="Type 'DELETE' to confirm"
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                  <button
                    onClick={handleDeleteAccount}
                    disabled={loading || deleteConfirm !== 'DELETE'}
                    className="w-full px-4 py-2 cursor-pointer text-white bg-gradient-to-br from-red-400 to-red-800 hover:from-red-500 hover:to-red-900 rounded-md flex justify-center items-center transition-transform transform hover:scale-105 disabled:opacity-50"
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
                      >
                        <ImSpinner3 className="text-lg" />
                      </motion.div>
                    ) : (
                      "PERMANENTLY DELETE"
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AccountSettings;