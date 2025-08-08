import React from 'react'
import AllHijabs from '../components/AllHijabs'
import Hero from '../components/Hero'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div>
      <Hero/>

       <motion.h2
    className="text-3xl md:text-4xl font-semibold text-teal-700 my-6"
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    Featured Hijab Styles to Inspire Your Look
  </motion.h2>
      <AllHijabs/></div>
  )
}

export default Home