import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";

// Import pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Profile from "@/pages/Profile";
import Live from "@/pages/Live";
import Website from "@/pages/Website";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/live" element={<Live />} />
          <Route path="/website" element={<Website />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;