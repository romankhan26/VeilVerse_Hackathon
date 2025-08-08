import { motion } from "framer-motion";
import React, { useState } from "react";
import { postRequest } from "../utils/apiClients";
import { ImSpinner3 } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPswd = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await postRequest(
        `${import.meta.env.VITE_BACKEND_URL}/auth/forgot-password`,
        { email }
      );

      setEmail("");
      toast.success(data.message || "Email sent successfully!");
    } catch (e) {
      console.error("Forgot password request failed:", e);
      toast.error(e.response?.data?.message || "Something went wrong.");
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
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl"
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center text-transparent bg-gradient-to-tr from-teal-300 to-teal-950 bg-clip-text uppercase font-bold">
          Forgot Password
        </h1>

        <form onSubmit={handleForgotPswd} className="space-y-4">
          <p className="text-center text-sm text-gray-500">
            Enter your email and we'll send you a password reset link.
          </p>

          <div>
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full px-4 py-2 border-none bg-gray-400/20 rounded-lg focus:outline-none focus:shadow-teal-700/80 shadow-xs"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 cursor-pointer py-2 text-white bg-gradient-to-br from-teal-300 to-teal-950 hover:from-teal-250 hover:to-teal-900 rounded-md flex justify-center transition-transform transform hover:scale-105"
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
              "Send Email"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;


///////////////////////////////WITHOUT TOAST
// import { motion } from "framer-motion";
// import React, { useState } from "react";
// import { postRequest } from "../utils/apiClients";
// import { ImSpinner3 } from "react-icons/im";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const handleForgotPswd = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     try {
//       setLoading(true);
//       const data = await postRequest(
//         `${import.meta.env.VITE_BACKEND_URL}/auth/forgot-password`,
//         { email }
//       );

//       setLoading(false);
//       setEmail("");
//       setMessage(data.message);
//     } catch (e) {
//       setLoading(false);

//       console.log("Forgot password request failed:", e);
//       setError(e.response?.data?.message || "Something went wrong.");
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
//           FORGOT PASSWORD{" "}
//         </h1>
//         <form onSubmit={handleForgotPswd} className="space-y-4">
//         <p className="text-center text-sm text-gray-500">
//   Enter your email and we'll send you a password reset link.
// </p>
//           {message && <p className="text-green-500 px-2">{message}</p>}
//           {error && <p className="text-red-500 px-2">{error}</p>}

//           <div>
//             <input
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               required
//               className="w-full px-4 py-2 border-none bg-gray-400/20 rounded-lg focus:outline-none focus:shadow-teal-700/80 shadow-xs"
//               placeholder="Enter your email"
//             />
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
//               "Send Email"
//             )}
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default ForgotPassword;
