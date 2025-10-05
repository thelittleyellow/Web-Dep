import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-8 text-center">PROFILE</h1>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="bg-black/20 p-6 rounded-lg backdrop-blur-sm text-center">
                <img 
                  src="https://cdn.pixabay.com/photo/2024/09/21/10/53/anime-9063542_640.png" 
                  alt="Ninomae Ina'nis Profile"
                  className="w-48 h-48 object-cover rounded-full mx-auto mb-4 border-4 border-white/30"
                />
                <h2 className="text-2xl font-bold text-white mb-2">Ninomae Ina'nis</h2>
                <p className="text-cyan-400 font-semibold">The Priestess of the Ancient Ones</p>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <div className="bg-black/20 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4 text-white">
                  <div>
                    <span className="text-cyan-400 font-semibold">Name:</span> Ninomae Ina'nis
                  </div>
                  <div>
                    <span className="text-cyan-400 font-semibold">Age:</span> ???
                  </div>
                  <div>
                    <span className="text-cyan-400 font-semibold">Height:</span> 157 cm
                  </div>
                  <div>
                    <span className="text-cyan-400 font-semibold">Birthday:</span> May 20
                  </div>
                  <div>
                    <span className="text-cyan-400 font-semibold">Zodiac:</span> Taurus
                  </div>
                  <div>
                    <span className="text-cyan-400 font-semibold">Emoji:</span> 🐙
                  </div>
                </div>
              </div>
              
              <div className="bg-black/20 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4">Personality Traits</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">Calm</span>
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">Artistic</span>
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">Mysterious</span>
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">Knowledgeable</span>
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">Pun-lover</span>
                </div>
              </div>
              
              <div className="bg-black/20 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4">Likes & Interests</h3>
                <ul className="text-white space-y-2">
                  <li>• Drawing and Art Creation</li>
                  <li>• Ancient Knowledge and Books</li>
                  <li>• Tentacles (obviously)</li>
                  <li>• Cookies and Snacks</li>
                  <li>• Playing Games (especially puzzle games)</li>
                  <li>• Making Puns and Dad Jokes</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-black/20 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">About Her Powers</h3>
            <p className="text-white/90 leading-relaxed">
              As a priestess of the Ancient Ones, Ina'nis possesses forbidden knowledge from eldritch realms. 
              Her connection to these cosmic entities grants her unique artistic abilities and insight into 
              mysteries beyond mortal comprehension. Despite her otherworldly origins, she uses her powers 
              for entertainment and spreading joy through her streams and artwork.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;