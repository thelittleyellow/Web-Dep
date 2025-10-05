import React, { useState } from 'react';

const Live = () => {
  const [isLive, setIsLive] = useState(false);
  
  const upcomingStreams = [
    {
      title: "Art Stream - Drawing Cosmic Horrors",
      date: "January 15, 2025",
      time: "8:00 PM JST",
      description: "Join Ina as she creates otherworldly art inspired by ancient knowledge!"
    },
    {
      title: "Minecraft Building Stream",
      date: "January 17, 2025", 
      time: "7:00 PM JST",
      description: "Building mysterious structures in the Hololive server"
    },
    {
      title: "Chatting Stream with Tako Friends", 
      date: "January 19, 2025",
      time: "9:00 PM JST",
      description: "A cozy chat stream with the priestess and her tentacult"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-8 text-center">LIVE STREAMS</h1>
          
          {/* Live Status */}
          <div className="text-center mb-12">
            <div className="bg-black/20 p-8 rounded-lg backdrop-blur-sm inline-block">
              <div className="flex items-center justify-center space-x-4">
                <div className={`w-4 h-4 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></div>
                <span className="text-white text-2xl font-bold">
                  {isLive ? 'CURRENTLY LIVE' : 'OFFLINE'}
                </span>
              </div>
              {!isLive && (
                <p className="text-white/70 mt-2">Check back soon for the next stream!</p>
              )}
            </div>
          </div>

          {/* Stream Player Area */}
          <div className="mb-12">
            <div className="bg-black/30 rounded-lg p-8 backdrop-blur-sm">
              <div className="aspect-video bg-black/50 rounded-lg flex items-center justify-center">
                {isLive ? (
                  <div className="text-white text-center">
                    <div className="text-4xl mb-4">🔴</div>
                    <h3 className="text-2xl font-bold mb-2">Live Stream</h3>
                    <p>Stream player would be embedded here</p>
                  </div>
                ) : (
                  <div className="text-white/70 text-center">
                    <img 
                      src="https://cdn.pixabay.com/photo/2023/12/07/11/11/girl-8435340_640.png" 
                      alt="Stream Placeholder"
                      className="w-32 h-32 object-cover rounded-full mx-auto mb-4 opacity-70"
                    />
                    <h3 className="text-xl font-bold mb-2">Stream Offline</h3>
                    <p>No active stream at the moment</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Upcoming Streams */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-8 text-center">UPCOMING STREAMS</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingStreams.map((stream, index) => (
                <div key={index} className="bg-black/20 p-6 rounded-lg backdrop-blur-sm hover:bg-black/30 transition-all duration-300">
                  <h3 className="text-xl font-bold text-white mb-3">{stream.title}</h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-cyan-400 font-semibold">📅 {stream.date}</p>
                    <p className="text-cyan-400 font-semibold">🕒 {stream.time}</p>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">{stream.description}</p>
                  <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-300 w-full">
                    Set Reminder
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-12 text-center">
            <div className="bg-black/20 p-6 rounded-lg backdrop-blur-sm inline-block">
              <h3 className="text-2xl font-bold text-white mb-4">Follow for Stream Updates</h3>
              <div className="flex space-x-4 justify-center">
                <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors duration-300">
                  YouTube
                </button>
                <button className="bg-blue-400 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-500 transition-colors duration-300">
                  Twitter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live;