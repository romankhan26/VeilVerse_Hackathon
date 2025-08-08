import React, { useEffect, useState } from "react";
import { postRequest } from "../utils/apiClients";
import { motion } from "framer-motion";
import { ImSpinner3 } from "react-icons/im";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getUser, setToken, setUser } from "../utils/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoArrowBack } from "react-icons/io5";

const Login = () => {
  const navigate = useNavigate();
  
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const user = getUser();
    if (user) {
      navigate("/"); // or /dashboard
    }
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await postRequest(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        toast.success("Logged in successfully!");

        setFormData({
          email: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(data.message || "Login failed.");
      }
    } catch (e) {
      toast.error(
          e.response?.data?.message ||
          "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative p-8 space-y-6 bg-white rounded-2xl shadow-xl"
      >
         <button
                  onClick={() => navigate(location.state?.from || "/")}
                  className="absolute top-4 left-4 text-gray-600 hover:text-teal-700 transition-colors"
                  disabled={loading}
                >
                  <IoArrowBack className="text-xl" />
                </button>
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center text-transparent bg-gradient-to-tr from-teal-300 to-teal-950 bg-clip-text uppercase font-bold">
          LOG IN
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="w-full px-4 py-2 border-none bg-gray-400/20 rounded-lg focus:outline-none focus:shadow-teal-700/80 shadow-xs"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <div className="relative">
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border-none bg-gray-400/20 rounded-lg focus:outline-none focus:shadow-teal-700/80 shadow-xs"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-600 hover:text-teal-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <p className="text-right w-full py-2 text-blue-900 hover:text-blue-800">
              <NavLink to="/forgot-password">Forgot Password?</NavLink>
            </p>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 cursor-pointer text-white bg-gradient-to-br from-teal-300 to-teal-950 hover:from-teal-250 hover:to-teal-900 rounded-md flex justify-center transition-transform transform hover:scale-105"
            disabled={loading}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
              >
                <ImSpinner3 className="text-lg" />
              </motion.div>
            ) : (
              "Log in"
            )}
          </button>

          <p className="text-left px-2 w-full">
            Don't have an account?{" "}
            <NavLink className="text-blue-900 hover:text-blue-800" to="/signup">
              Sign up
            </NavLink>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;

/////////////////////////////// without toast

// import React, { useState } from "react";
// import { postRequest } from "../../utils/apiClients";
// import { motion } from "framer-motion";
// import { ImSpinner3 } from "react-icons/im";
// import { NavLink, useNavigate } from "react-router-dom";
// import { setToken, setUser } from "../../utils/auth";
// const Login = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const data = await postRequest(
//         `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
//         { email: formData.email, password: formData.password }
//       );
//       if (data.success) {
//         setToken(data.token);
//         setUser(data.user);
//         console.log(data.user)
//         /// reset form
//         setFormData({
//           name: "",
//           email: "",
//           contact: "",
//           password: "",
//         });
//         setLoading(false);
//         navigate("/");
//       } else {
//         console.log("Login Fail ", data.message);
//       }
//     } catch (e) {
//       console.log("Login Failed : ", e);
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }} // starts faded and pushed down
//         animate={{ opacity: 1, y: 0 }} // animates into place
//         transition={{ duration: 0.5, ease: "easeOut" }} // smooth transition
//         className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl"
//       >
//         <h1 className="text-2xl md:text-3xl lg:text-4xl text-center text-transparent bg-gradient-to-tr from-teal-300 to-teal-950 bg-clip-text uppercase font-bold">
//           LOG IN{" "}
//         </h1>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <input
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               type="email"
//               className="w-full px-4 py-2 border-none bg-gray-400/20 rounded-lg focus:outline-none focus:shadow-teal-700/80 shadow-xs
//            "
//               placeholder="Enter your email"
//             />
//           </div>
//           <div>
//             <div className="relative">
//               <input
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 type={showPassword ? "text" : "password"}
//                 className="w-full px-4 py-2 border-none bg-gray-400/20 rounded-lg focus:outline-none focus:shadow-teal-700/80 shadow-xs "
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="submit"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-600 hover:text-teal-700"
//               >
//                 Show
//               </button>
//             </div>
//             <p className="text-right w-full  py-2 text-blue-900 hover:text-blue-800">
//               <NavLink to="/forgot-password">Forgot Password?</NavLink>
//             </p>
//           </div>

//           <button
//             type="submit"
//             className="w-full px-4 cursor-pointer py-2 text-white  bg-gradient-to-br from-teal-300 to-teal-950 hover:from-teal-250 hover:to-teal-900 rounded-md flex justify-center transition-transform transform hover:scale-105"
//             disabled={loading ? true : false}
//           >
//             {loading ? (
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
//               >
//                 <ImSpinner3 className="text-lg" />
//               </motion.div>
//             ) : (
//               "Log in"
//             )}
//           </button>
//            <p className="text-left px-2 w-full  ">
//               Don't have an account? <NavLink className=" text-blue-900 hover:text-blue-800" to="/signup">Sign up</NavLink>
//             </p>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;
