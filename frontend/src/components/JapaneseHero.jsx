import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Cherry, Sparkles } from 'lucide-react';

const JapaneseHero = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        {/* Geometric Shapes */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-red-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 left-1/4 w-6 h-6 bg-blue-400 opacity-50">
          <div className="w-full h-0.5 bg-blue-400 absolute top-1/2 transform -translate-y-1/2"></div>
          <div className="h-full w-0.5 bg-blue-400 absolute left-1/2 transform -translate-x-1/2"></div>
        </div>
        <div className="absolute top-60 right-20 w-5 h-5 bg-red-400 opacity-50 transform rotate-45"></div>
        <div className="absolute bottom-32 left-16 w-8 h-8 border-2 border-blue-400 rounded-full opacity-40"></div>
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-pink-400 rounded-full opacity-60"></div>
        
        {/* Plus shapes */}
        <div className="absolute top-32 right-1/4 w-4 h-4 opacity-40">
          <div className="w-full h-0.5 bg-red-400 absolute top-1/2 transform -translate-y-1/2"></div>
          <div className="h-full w-0.5 bg-red-400 absolute left-1/2 transform -translate-x-1/2"></div>
        </div>
        <div className="absolute bottom-40 left-1/3 w-5 h-5 opacity-30">
          <div className="w-full h-0.5 bg-blue-400 absolute top-1/2 transform -translate-y-1/2"></div>
          <div className="h-full w-0.5 bg-blue-400 absolute left-1/2 transform -translate-x-1/2"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Glassmorphism Card */}
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 p-8 shadow-2xl">
              <div className="space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-100/50 rounded-full border border-red-200/30">
                  <Cherry className="w-4 h-4 text-red-600" />
                  <span className="text-red-700 text-sm font-medium">Discover Japanese Culture</span>
                </div>
                
                {/* Main Title */}
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                    Japanese
                  </span>
                  <br />
                  <span className="text-gray-700">Culture</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  Explore the beauty, traditions, and timeless elegance of Japan. 
                  Discover ancient wisdom, modern aesthetics, and cultural treasures 
                  that have inspired the world for centuries.
                </p>
                
                {/* CTA Button */}
                <div className="pt-4">
                  <Button className="group bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center space-x-2">
                    <span className="text-lg">Get Started</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 p-4 text-center">
                <div className="text-2xl font-bold text-gray-800">1000+</div>
                <div className="text-sm text-gray-600">Traditions</div>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 p-4 text-center">
                <div className="text-2xl font-bold text-gray-800">500+</div>
                <div className="text-sm text-gray-600">Stories</div>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 p-4 text-center">
                <div className="text-2xl font-bold text-gray-800">100+</div>
                <div className="text-sm text-gray-600">Festivals</div>
              </div>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Image Container */}
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl border border-white/30 p-8 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1584191610831-9ff04a5b9596?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxhbmltZSUyMGdpcmwlMjBraW1vbm98ZW58MHx8fHwxNzU5MjQwNjQzfDA&ixlib=rb-4.1.0&q=85" 
                  alt="Japanese girl in traditional kimono"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 bg-pink-400/20 backdrop-blur-md rounded-full p-3 border border-white/30">
                  <Sparkles className="w-6 h-6 text-pink-600" />
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-red-400/20 backdrop-blur-md rounded-full p-3 border border-white/30">
                  <Cherry className="w-6 h-6 text-red-600" />
                </div>
              </div>
              
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-3xl blur-3xl -z-10 transform scale-110"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JapaneseHero;