import React from 'react';
import logo from '/PennyPlan_Logo.png';

const Navbar = () => {
  return (
    <nav className="bg-white px-40 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-10 mr-3"/>
          <h1 className="text-gray-800 text-2xl">PennyPlan</h1>
        </div>
        {/* Links */}
        <ul className="flex space-x-4">
          <li><a href="/" className="text-gray-800">Home</a></li>
          <li><a href="/about" className="text-gray-80">About</a></li>
          <li><a href="/contact" className="text-gray-80">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
