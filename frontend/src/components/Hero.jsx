import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <section className=" min-h-screen flex flex-col md:flex-row justify-center items-center px-6 text-center md:text-left space-y-10 md:space-y-0 md:space-x-12">
      {/* Text Content */}
      <motion.div
        className="max-w-xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 pb-2 bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
          Discover the Art of Elegant Hijab Styling
        </h1>
        <p className="text-lg md:text-xl mb-10">
          Explore diverse hijab styles to express your unique personality with grace and confidence.
        </p>
        <div className="flex justify-center md:justify-start space-x-6">
   <p className="p-0.5 rounded-md bg-gradient-to-r from-teal-600 to-teal-800 inline-block">
  <NavLink
    href="/hijab-styles"
    className="block rounded-md border-transparent bg-white px-6 py-3 font-semibold transition
      hover:border-transparent text-black
      hover:bg-gradient-to-r hover:from-teal-600 hover:to-teal-800
      hover:text-white"
  >
    Explore Styles
  </NavLink>
</p>

          
        </div>
      </motion.div>

      {/* Image */}
<motion.div
  className="relative w-full max-w-md"
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 1 }}
>
  <img
    src="hero_main.webp" // replace with your image path
    alt="Elegant hijab style"
    className="rounded-lg  object-cover w-full h-auto"
  />

  {/* Bottom smudge / fade effect */}
  <div
    className="absolute bottom-0 left-0 w-full h-20 rounded-b-lg pointer-events-none"
    style={{
      background:
        "linear-gradient(to top, white, transparent)",
      zIndex: 10,
    }}
  />
</motion.div>


    </section>
  );
};

export default Hero;
