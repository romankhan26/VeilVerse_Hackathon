import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { postRequest } from "../utils/apiClients";
import { ImSpinner3 } from "react-icons/im";
import { getUser, setToken, setUser } from "../utils/auth";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoArrowBack } from "react-icons/io5";

const SignUp = () => {
  const navigate = useNavigate();
  
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (formData.password !== value) {
      toast.error("Passwords do not match.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const data = await postRequest(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
        formData
      );

      if (data.success) {
        setToken(data.token);
        setUser(data.user);

        toast.success("Signup successful!");

        // Reset form
        setFormData({
          name: "",
          email: "",
          contact: "",
          password: "",
        });
        setConfirmPassword("");
        setShowPassword1(false);
        setShowPassword2(false);

        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(data.message || "Signup failed.");
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong.");
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
        className="w-full max-w-md p-8 space-y-6 relative bg-white rounded-2xl shadow-xl"
      >
           <button
                          onClick={() => navigate(location.state?.from || "/")}
                          className="absolute top-4 left-4 text-gray-600 hover:text-teal-700 transition-colors"
                          disabled={loading}
                        >
                          <IoArrowBack className="text-xl" />
                        </button>
        <h1 className="text-3xl text-center text-transparent bg-gradient-to-tr from-teal-300 to-teal-950 bg-clip-text uppercase font-bold">
          SIGN UP
        </h1>

        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            className="w-full px-4 py-2 border-none bg-gray-400/20 rounded-lg focus:outline-none focus:shadow-teal-700/80 shadow-xs"
            placeholder="Full Name"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="w-full px-4 py-2 border-none bg-gray-400/20 rounded-lg focus:outline-none focus:shadow-teal-700/80 shadow-xs"
            placeholder="Email"
          />

          <input
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            type="tel"
            className="w-full px-4 py-2 border-none bg-gray-400/20 rounded-lg focus:outline-none focus:shadow-teal-700/80 shadow-xs"
            placeholder="Phone Number"
          />

          <div className="relative">
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword1 ? "text" : "password"}
              className="w-full px-4 py-2 border-none bg-gray-400/20 rounded-lg focus:outline-none focus:shadow-teal-700/80 shadow-xs"
              placeholder="Password"
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

          <button
            type="submit"
            className="w-full px-4 py-2 cursor-pointer text-white bg-gradient-to-br from-teal-300 to-teal-950 hover:from-teal-250 hover:to-teal-900 rounded-md flex justify-center items-center transition-transform transform hover:scale-105"
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
              "Sign up"
            )}
          </button>

          <p className="text-left px-2 w-full">
            Already have an account?{" "}
            <NavLink
              className=" text-blue-900 hover:text-blue-800"
              to="/login"
            >
              Sign in
            </NavLink>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;





///////////////////////////WITHOUT TOAST

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { NavLink, useNavigate } from "react-router-dom";
// import { postRequest } from "../../utils/apiClients";
// import { ImSpinner3 } from "react-icons/im"; // 👈 import spinner icon
// import { setToken, setUser } from "../../utils/auth"; // 👈 assuming you use these
// import { LuEye, LuEyeClosed } from "react-icons/lu";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword1, setShowPassword1] = useState(false);
//   const [showPassword2, setShowPassword2] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     contact: "",
//     password: "",
//   });
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleConfirmPassword = (e) => {
//     const value = e.target.value;
//     setConfirmPassword(value);

//     if (formData.password !== value) {
//       setError("Passwords do not match.");
//     } else {
//       setError("");
//     }
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     if (formData.password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const data = await postRequest(
//         `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
//         formData
//       );

//       if (data.success) {
//         console.log("signup data >>>>>>>>>>>>>>>>> ", data);
//         setToken(data.token);
//         setUser(data.user);

//         // Reset form
//         setFormData({
//           name: "",
//           email: "",
//           contact: "",
//           password: "",
//         });
//         setConfirmPassword("");
//         setShowPassword(false);
//         setError("");

//         navigate("/");
//       } else {
//         console.log("Signup Fail ", data.message);
//         setError(data.message || "Signup failed.");
//       }
//     } catch (e) {
//       console.log("Signup Failed : ", e);
//       setError(e.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl"
//       >
//         <h1 className="text-3xl text-center text-transparent bg-gradient-to-tr from-teal-300 to-teal-950 bg-clip-text uppercase font-bold">
//           SIGN UP
//         </h1>

//         <form onSubmit={handleSignUp} className="space-y-4">
//           <input
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             type="text"
//             className="w-full px-4 py-2 border-none bg-gray-400/20 rounded-lg focus:outline-none focus:shadow-teal-700/80 shadow-xs"
//             placeholder="Full Name"
//           />

//           <input
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             type="email"
//             className="w-full px-4 py-2 border-none bg-gray-400/20 rounded-lg focus:outline-none focus:shadow-teal-700/80 shadow-xs"
//             placeholder="Email"
//           />

//           <input
//             name="contact"
//             value={formData.contact}
//             onChange={handleChange}
//             type="tel"
//             className="w-full px-4 py-2 border-none bg-gray-400/20 rounded-lg focus:outline-none focus:shadow-teal-700/80 shadow-xs"
//             placeholder="Phone Number"
//           />

//           <div className="relative">
//             <input
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               type={showPassword1 ? "text" : "password"}
//               className="w-full px-4 py-2 border-none bg-gray-400/20 rounded-lg focus:outline-none focus:shadow-teal-700/80 shadow-xs"
//               placeholder="Password"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword1(!showPassword1)}
//               className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-600 hover:text-teal-700"
//             >
//               {showPassword1 ? <LuEye className="text-teal-700 cursor-pointer"/> : <LuEyeClosed  className="cursor-pointer"/> }
//             </button>
//           </div>

//           <div className="relative">
//             <input
//               name="confirmPassword"
//               value={confirmPassword}
//               onChange={handleConfirmPassword}
//               type={showPassword2 ? "text" : "password"}
//               className="w-full px-4 py-2 border-none bg-gray-400/20 rounded-lg focus:outline-none focus:shadow-teal-700/80 shadow-xs"
//               placeholder="Confirm Password"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword2(!showPassword2)}
//               className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-600 hover:text-teal-700"
//             >
//               {showPassword2 ? <LuEye className="text-teal-700 cursor-pointer"/> :<LuEyeClosed  className="cursor-pointer" /> }
//             </button>
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             type="submit"
//             className="w-full px-4 py-2 cursor-pointer text-white bg-gradient-to-br from-teal-300 to-teal-950 hover:from-teal-250 hover:to-teal-900 rounded-md flex justify-center items-center transition-transform transform hover:scale-105"
//             disabled={loading}
//           >
//             {loading ? (
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
//               >
//                 <ImSpinner3 className="text-lg" />
//               </motion.div>
//             ) : (
//               "Sign up"
//             )}
//           </button>
//            <p className="text-left px-2 w-full  ">
//               Already have an account? <NavLink className=" text-blue-900 hover:text-blue-800" to="/login">Sign in</NavLink>
//             </p>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default SignUp;
