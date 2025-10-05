import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-8 text-center">ABOUT</h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-black/20 p-6 rounded-lg backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-4">Who is Ninomae Ina'nis?</h2>
                <p className="text-white/90 leading-relaxed">
                  Ninomae Ina'nis is a Virtual YouTuber associated with Hololive English. 
                  She is part of the first generation of English-speaking VTubers under the Hololive brand, 
                  known for her artistic talents, calm demeanor, and love for tentacles and ancient knowledge.
                </p>
              </div>
              
              <div className="bg-black/20 p-6 rounded-lg backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-4">The Priestess</h2>
                <p className="text-white/90 leading-relaxed">
                  As a priestess of the Ancient Ones, Ina'nis brings forbidden knowledge from 
                  eldritch realms to the world of virtual streaming. Her mysterious background 
                  and artistic prowess make her a unique presence in the VTuber landscape.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1613376023733-0a73315d9b06" 
                alt="Ninomae Ina'nis"
                className="w-80 h-80 object-cover rounded-full mx-auto shadow-2xl border-4 border-white/30"
              />
            </div>
          </div>
          
          <div className="mt-12 bg-black/20 p-8 rounded-lg backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Debut & Achievements</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">Debut Date</h3>
                <p className="text-white">September 13, 2020</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">Generation</h3>
                <p className="text-white">Hololive EN Gen 1</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">Specialty</h3>
                <p className="text-white">Art & Drawing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;