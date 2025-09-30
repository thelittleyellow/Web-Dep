import React from 'react';
import { Search, Settings } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white/90 hover:text-white transition-colors duration-300 font-medium">
              Home
            </a>
            <a href="#service" className="text-white/90 hover:text-white transition-colors duration-300 font-medium">
              Service
            </a>
            <a href="#contact" className="text-white/90 hover:text-white transition-colors duration-300 font-medium">
              Contact
            </a>
            <a href="#about" className="text-white/90 hover:text-white transition-colors duration-300 font-medium">
              About
            </a>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
              <Search className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;