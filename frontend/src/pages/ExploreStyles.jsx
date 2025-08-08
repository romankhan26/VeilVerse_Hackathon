import React from 'react'
import AllHijabs from '../components/AllHijabs'
import {motion} from "framer-motion"
const ExploreStyles = () => {
  return (
    <div>
       <motion.h1
    className="text-5xl md:text-6xl font-extrabold py-3 text-center my-8 bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
  >
    Explore Elegant Hijab Styles
  </motion.h1>
      <AllHijabs/></div>
  )
}

export default ExploreStyles