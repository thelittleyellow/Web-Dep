import React from 'react';
import { Home, Users, Newspaper, Mail } from 'lucide-react';

const JapaneseNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-md border-b border-white/30">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-400 to-pink-400 flex items-center justify-center">
              <span className="text-white font-bold text-lg">東</span>
            </div>
            <span className="text-gray-800 font-semibold text-lg hidden md:block">Touhou</span>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="flex items-center space-x-2 text-gray-800 hover:text-red-500 transition-colors duration-300 font-medium group">
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span>Home</span>
            </a>
            <a href="#about-us" className="flex items-center space-x-2 text-gray-800 hover:text-red-500 transition-colors duration-300 font-medium group">
              <Users className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span>About Us</span>
            </a>
            <a href="#news" className="flex items-center space-x-2 text-gray-800 hover:text-red-500 transition-colors duration-300 font-medium group">
              <Newspaper className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span>News</span>
            </a>
            <a href="#contact" className="flex items-center space-x-2 text-gray-800 hover:text-red-500 transition-colors duration-300 font-medium group">
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span>Contact</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-200">
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className="bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm"></span>
                <span className="bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5"></span>
                <span className="bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm"></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default JapaneseNavbar;