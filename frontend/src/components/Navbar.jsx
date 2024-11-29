import React from 'react';
import logo from '/PennyPlan_Logo.png'; // Adjust the path according to your file structure

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-10 mr-3" /> {/* Adjust height and width as needed */}
          <h1 className="text-white text-2xl">PennyPlan</h1>
        </div>
        {/* Links */}
        <ul className="flex space-x-4">
          <li><a href="/" className="text-white">Home</a></li>
          <li><a href="/about" className="text-white">About</a></li>
          <li><a href="/contact" className="text-white">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
