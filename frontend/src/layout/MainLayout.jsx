import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="relative">
      {/* Fixed Navbar */}
      <Navbar />
      
      {/* Main content area */}
      <main className="md:ml-20 min-h-screen transition-all duration-300">
        <div className="w-full mx-auto max-w-[1024px] px-4 py-4 md:py-6">
          <Outlet />
        </div>
      </main>
    <footer className=" text-white bg-teal-800  md:ml-20 box-border -mb-10">
  <Footer/>
</footer>
    </div>
  );
};

export default MainLayout;