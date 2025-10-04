import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUpForm from './components/SignUpForm';
import JapaneseCulturePage from './pages/JapaneseCulturePage';
import { Toaster } from './components/ui/toaster';
import './App.css';

const SignUpPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1633952732574-994584939a38?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxzdW5zZXQlMjBtb3VudGFpbiUyMGxha2V8ZW58MHx8fHwxNzU5MjM3OTE2fDA&ixlib=rb-4.1.0&q=85)',
        }}
      >
        {/* Gradient Overlay for sunset effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 via-purple-500/40 to-blue-900/60"></div>
        
        {/* Stars effect */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        
        {/* Main Content */}
        <div className="flex items-center justify-center min-h-screen px-4 pt-20">
          <SignUpForm />
        </div>
      </div>
      
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<JapaneseCulturePage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;