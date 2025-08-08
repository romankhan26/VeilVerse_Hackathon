import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoHomeFill } from "react-icons/go";
import { FcAbout } from "react-icons/fc";
import {
  IoIosSettings,
  IoIosNotifications,
  IoMdInformationCircle,
} from "react-icons/io";
import { FaComments } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { SiAnswer } from "react-icons/si";
import { RiUser3Fill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { getUser, removeToken, removeUser } from "../utils/auth";
import { toast } from "react-toastify";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { FaScrewdriverWrench } from "react-icons/fa6";

const navlinks = [
  { name: "Home", path: "/", icon: <GoHomeFill /> },
  { name: "About", path: "/about", icon: <IoMdInformationCircle /> },
  { name: "Questions Forum", path: "/questions-forum", icon: <FaComments /> },
  {
    name: "Feedback Forum",
    path: "/feedback-forum",
    icon: <SiAnswer className="text-[22px] pl-1" />,
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: <IoIosNotifications />,
  },
  { name: "Profile", path: "/dashboard", icon: <RiUser3Fill /> },
  {
    name: "Account Settings",
    path: "/dashboard/account-settings",
    icon: <IoIosSettings />,
  },
];

const sidebarVariants = {
  collapsed: { width: "5rem" },
  expanded: { width: "16rem" },
};

const labelVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const mobileSidebarVariants = {
  hidden: { x: "-100%" },
  visible: { x: 0 },
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
const user =getUser()
  const handleLogout = () => {
    removeUser();
    removeToken();
    navigate("/");
    toast.info("You've been logged out");
  };

  console.log(user,"Navbar")
  return (
    <>
      {/* Mobile Hamburger Button (only on mobile) */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-teal-800 rounded-md text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? (
          <AiOutlineClose size={24} />
        ) : (
          <GiHamburgerMenu size={24} />
        )}
      </button>

      {/* Desktop Sidebar (always visible on desktop) */}
      <motion.div
        className="hidden md:block fixed h-full bg-gradient-to-br from-teal-800 to-teal-950 text-white z-40"
        initial="collapsed"
        animate={isHovered ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="h-full flex flex-col py-4 overflow-hidden">
          {/* Logo */}
          <div className="px-4 mb-8">
            <motion.h1
              className="text-xl font-bold truncate"
              animate={{ opacity: isHovered ? 1 : 0 }}
            >
              VeilVerse
            </motion.h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1">
            <ul className="space-y-2 px-2">
              {navlinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center relative p-3 rounded-lg hover:bg-teal-700 transition-colors ${
                        isActive ? "bg-teal-700" : ""
                      }`
                    }
                  >
                    <span className="text-2xl">{link.icon}</span>
                    <motion.span
                      className="absolute left-14 bg-teal-700 px-3 py-1 rounded-full whitespace-nowrap"
                      variants={labelVariants}
                      initial="hidden"
                      animate={isHovered ? "visible" : "hidden"}
                    >
                      {link.name}
                    </motion.span>
                  </NavLink>
                </li>
              ))}
              {user&& 
                user.role === "admin" &&  <li >
                  <NavLink
                    to="admin-panel"
                    className={({ isActive }) =>
                      `flex items-center relative p-3 rounded-lg hover:bg-teal-700 transition-colors ${
                        isActive ? "bg-teal-700" : ""
                      }`
                    }
                  >
                    <span className="text-2xl"><FaScrewdriverWrench /></span>
                    <motion.span
                      className="absolute left-14 bg-teal-700 px-3 py-1 rounded-full whitespace-nowrap"
                      variants={labelVariants}
                      initial="hidden"
                      animate={isHovered ? "visible" : "hidden"}
                    >
                      Admin Panel
                    </motion.span>
                  </NavLink>
                </li>
              }
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full flex cursor-pointer items-center relative p-3 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <span className="text-2xl">
                    <IoLogOut />
                  </span>
                  <motion.span
                    className="absolute left-14 bg-teal-700 px-3 py-1 rounded-full whitespace-nowrap"
                    variants={labelVariants}
                    initial="hidden"
                    animate={isHovered ? "visible" : "hidden"}
                  >
                    Log out
                  </motion.span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="md:hidden fixed h-full bg-teal-800 text-white z-40 w-64"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileSidebarVariants}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="h-full flex flex-col py-4">
                <div className="px-4 mb-8">
                  <h1 className="text-xl font-bold">VeilVerse</h1>
                </div>

                <nav className="flex-1">
                  <ul className="space-y-2 px-2">
                    {navlinks.map((link, index) => (
                      <li key={index}>
                        <NavLink
                          to={link.path}
                          className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg hover:bg-teal-700 transition-colors ${
                              isActive ? "bg-teal-700" : ""
                            }`
                          }
                          onClick={() => setMobileOpen(false)}
                        >
                          <span className="text-2xl">{link.icon}</span>
                          <span className="ml-3">{link.name}</span>
                        </NavLink>
                      </li>
                    ))}
                    {user&& 
                user.role === "admin" &&  <li >
                        <NavLink
                          to="/admin-panel"
                          className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg hover:bg-teal-700 transition-colors ${
                              isActive ? "bg-teal-700" : ""
                            }`
                          }
                          onClick={() => setMobileOpen(false)}
                        >
                          <span className="text-2xl"><FaScrewdriverWrench /></span>
                          <span className="ml-3">Admin Panel</span>
                        </NavLink>
                      </li>
                 }
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-teal-700 transition-colors w-full"
                      >
                        <span className="text-2xl">
                          <IoLogOut />
                        </span>
                        <span className="ml-3">Logout</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </motion.div>

            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
