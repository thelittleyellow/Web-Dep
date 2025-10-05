import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-white font-bold text-xl">
            <span className="text-cyan-400">Hololive</span>
          </div>
          
          {/* Navigation Links */}
          <div className="flex space-x-8">
            <Link 
              to="/about" 
              className={`text-white hover:text-cyan-400 transition-colors duration-300 ${
                isActive('/about') ? 'text-cyan-400' : ''
              }`}
            >
              ABOUT
            </Link>
            <Link 
              to="/profile" 
              className={`text-white hover:text-cyan-400 transition-colors duration-300 ${
                isActive('/profile') ? 'text-cyan-400' : ''
              }`}
            >
              PROFILE
            </Link>
            <Link 
              to="/" 
              className={`text-white hover:text-cyan-400 transition-colors duration-300 ${
                isActive('/') ? 'text-cyan-400 font-bold' : ''
              }`}
            >
              HOME
            </Link>
            <Link 
              to="/live" 
              className={`text-white hover:text-cyan-400 transition-colors duration-300 ${
                isActive('/live') ? 'text-cyan-400' : ''
              }`}
            >
              LIVE
            </Link>
            <Link 
              to="/website" 
              className={`text-white hover:text-cyan-400 transition-colors duration-300 ${
                isActive('/website') ? 'text-cyan-400' : ''
              }`}
            >
              WEBSITE
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;