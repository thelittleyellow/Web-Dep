import React from 'react';

const Website = () => {
  const features = [
    {
      title: "Art Gallery",
      description: "Explore Ina's amazing artwork and digital creations",
      icon: "🎨"
    },
    {
      title: "Stream Archive", 
      description: "Access past streams and memorable moments",
      icon: "📺"
    },
    {
      title: "Community Hub",
      description: "Connect with fellow Tako friends and fans",
      icon: "🐙"
    },
    {
      title: "Merchandise Store",
      description: "Official Hololive and Ina merchandise",
      icon: "🛒"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-8 text-center">WEBSITE</h1>
          
          {/* Website Overview */}
          <div className="text-center mb-12">
            <div className="bg-black/20 p-8 rounded-lg backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-4">Official Ninomae Ina'nis Website</h2>
              <p className="text-white/90 text-lg leading-relaxed max-w-3xl mx-auto">
                Welcome to the official website of Ninomae Ina'nis, the priestess of the Ancient Ones. 
                This is your gateway to everything Ina - from her latest streams and artwork to community 
                interactions and exclusive content.
              </p>
            </div>
          </div>

          {/* Website Features */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">WEBSITE FEATURES</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-black/20 p-6 rounded-lg backdrop-blur-sm hover:bg-black/30 transition-all duration-300 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Updates */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">RECENT UPDATES</h2>
            <div className="space-y-6">
              <div className="bg-black/20 p-6 rounded-lg backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">NEW</div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Website Redesign Complete</h3>
                    <p className="text-white/90 text-sm">Our website has been completely redesigned with a modern interface and improved user experience.</p>
                    <p className="text-cyan-400 text-xs mt-2">January 10, 2025</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/20 p-6 rounded-lg backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">UPDATE</div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">New Art Gallery Section</h3>
                    <p className="text-white/90 text-sm">Browse through Ina's latest artwork and digital creations in our new dedicated gallery section.</p>
                    <p className="text-cyan-400 text-xs mt-2">January 5, 2025</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/20 p-6 rounded-lg backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">INFO</div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Mobile App Coming Soon</h3>
                    <p className="text-white/90 text-sm">Stay tuned for our upcoming mobile application with exclusive features for Tako fans!</p>
                    <p className="text-cyan-400 text-xs mt-2">December 28, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Info */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">Website Statistics</h3>
              <div className="space-y-3 text-white">
                <div className="flex justify-between">
                  <span>Daily Visitors:</span>
                  <span className="text-cyan-400 font-bold">50,000+</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Page Views:</span>
                  <span className="text-cyan-400 font-bold">2.5M+</span>
                </div>
                <div className="flex justify-between">
                  <span>Community Members:</span>
                  <span className="text-cyan-400 font-bold">125,000+</span>
                </div>
                <div className="flex justify-between">
                  <span>Uptime:</span>
                  <span className="text-green-400 font-bold">99.9%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-black/20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">Connect & Support</h3>
              <div className="space-y-4">
                <button className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors duration-300">
                  Subscribe on YouTube
                </button>
                <button className="w-full bg-blue-400 text-white py-3 rounded-lg font-bold hover:bg-blue-500 transition-colors duration-300">
                  Follow on Twitter
                </button>
                <button className="w-full bg-purple-500 text-white py-3 rounded-lg font-bold hover:bg-purple-600 transition-colors duration-300">
                  Join Discord Server
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Website;