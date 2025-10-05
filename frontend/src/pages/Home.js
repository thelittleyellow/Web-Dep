import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden">
      {/* Number 06 in top left */}
      <div className="absolute top-20 left-6 z-10">
        <div className="bg-black/30 p-6 rounded-lg backdrop-blur-sm">
          <span className="text-white text-6xl font-bold">06</span>
        </div>
      </div>
      
      {/* Date and event info - Top Left */}
      <div className="absolute top-32 left-6 max-w-xs z-10">
        <div className="bg-black/20 p-4 rounded-lg backdrop-blur-sm">
          <p className="text-white text-sm leading-relaxed">
            ON JANUARY 6, THE TWITTER ACCOUNT REVEALED 
            ADDITIONAL NEW YEAR AND ZODIAC MEMBERS WILL 
            RECEIVE NEW YEAR COSTUMES.
          </p>
        </div>
        <div className="bg-black/20 p-4 rounded-lg backdrop-blur-sm mt-4">
          <p className="text-white text-sm leading-relaxed">
            ON APRIL 23, 2024, FOLLOWING THE SUCCESS OF 
            ADVANCED LANGUAGE GROUP ETHICS ENGLISH OPEN 
            CONTESTANT DISMISSED AUDITIONS FOR 
            ENGLISH-SPEAKING CANDIDATES UPDATED TECHNOLOGY 
            ACCEPTING LOVE AND JOB TAX.
          </p>
        </div>
      </div>

      {/* Main character and title */}
      <div className="flex items-center justify-center min-h-screen relative">
        <div className="text-center z-10">
          {/* Character Image */}
          <div className="mb-8 relative">
            <img 
              src="https://images.unsplash.com/photo-1613376023733-0a73315d9b06" 
              alt="Ninomae Ina'nis"
              className="w-96 h-96 object-cover rounded-full mx-auto shadow-2xl"
            />
            {/* Character name labels */}
            <div className="absolute -left-20 top-1/3 bg-white px-4 py-2 rounded-lg shadow-lg transform -rotate-12">
              <span className="text-gray-800 font-bold text-sm">NINOMAE</span>
            </div>
            <div className="absolute -right-20 top-2/3 bg-white px-4 py-2 rounded-lg shadow-lg transform rotate-12">
              <span className="text-gray-800 font-bold text-sm">INA'NIS</span>
            </div>
          </div>
          
          {/* Main Title */}
          <h1 className="text-8xl font-bold text-white mb-8 tracking-wider drop-shadow-2xl">
            NINOMAE <span className="block">INA'NIS</span>
          </h1>
          
          {/* Action buttons */}
          <div className="flex space-x-6 justify-center mb-8">
            <button className="bg-cyan-400 text-white px-6 py-3 rounded-lg font-bold hover:bg-cyan-500 transition-colors duration-300">
              FOLLOW
            </button>
            <button className="bg-purple-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-600 transition-colors duration-300">
              HOLOLIVE
            </button>
          </div>
        </div>
      </div>

      {/* Right side info */}
      <div className="absolute top-32 right-6 max-w-sm z-10">
        <div className="bg-black/20 p-4 rounded-lg backdrop-blur-sm">
          <h3 className="text-white font-bold text-lg mb-2">HOLOLIVE EN</h3>
          <p className="text-white text-sm leading-relaxed">
            NINOMAE INA'NIS IS A VIRTUAL YOUTUBER ASSOCIATED 
            WITH HOLOLIVE, AS PART OF THE FIRST GENERATION ENGLISH UNIT 
            BRANCH OF FRENCH YOUTUBERS WITH ELDRITCH KAWAI. MOTION ANIMAL. MAIN COLLAB, AND AART CREATION.
          </p>
        </div>
        
        <div className="bg-black/20 p-4 rounded-lg backdrop-blur-sm mt-4">
          <p className="text-white text-sm leading-relaxed">
            ON JANUARY 6, THE TWITTER ACCOUNT REVEALED ANNOUNCED THAT APRIL 
            AND CLOSED AUDIENCES WILL RECEIVE NEW YEAR'S COSTUMES.
          </p>
        </div>
      </div>

      {/* Bottom character portraits */}
      <div className="absolute bottom-8 left-6 flex space-x-4 z-10">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/50">
          <img 
            src="https://cdn.pixabay.com/photo/2024/09/21/10/53/anime-9063542_640.png" 
            alt="Character 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/50">
          <img 
            src="https://cdn.pixabay.com/photo/2023/12/07/11/11/girl-8435340_640.png" 
            alt="Character 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/50">
          <img 
            src="https://cdn.pixabay.com/photo/2023/06/02/15/46/ai-generated-8035998_640.png" 
            alt="Character 3"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Credits */}
      <div className="absolute bottom-4 left-6 z-10">
        <p className="text-white/70 text-xs">GRAPHIC EDITING INDONESIA</p>
      </div>

      <div className="absolute bottom-4 right-6 z-10">
        <p className="text-white/70 text-xs">graphic design</p>
      </div>

      <div className="absolute bottom-4 right-32 z-10">
        <p className="text-white/70 text-xs">EDITED BY: TAILS ID</p>
      </div>
    </div>
  );
};

export default Home;