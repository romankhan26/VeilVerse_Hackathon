import React from "react";
import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center  md:justify-between items-center py-6 px-4 space-y-2  max-w-[1024px] w-full mx-auto  box-border m-0">

      <div className="text-sm">&copy; {new Date().getFullYear()} Roman Ayub Khan. All rights reserved.</div>
      
      <div className="flex space-x-6">
        <a
          href="https://github.com/romankhan26"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-teal-400 transition"
        >
          <FaGithub size={24} />
        </a>
  <a
          href="https://pk.linkedin.com/in/roman-ayub-khan-025877316"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-teal-400 transition"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="mailto:romanayub.26@gmail.com"
          aria-label="Email"
          className="hover:text-teal-400 transition"
        >
          <FaEnvelope size={24} />
        </a>
      </div>
       </div>

  );
};

export default Footer;
