import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';

// Auth Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user data
      fetchProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      localStorage.removeItem('token');
    }
    setLoading(false);
  };

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Components
const Navbar = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold text-white flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-purple-600 rounded-full mr-3"></div>
            TOUHOU PROJECT
          </div>
          <div className="flex space-x-6">
            {['HOME', 'CHARACTERS', 'LORE', 'MUSIC', 'WIKI'].map((item) => (
              <button
                key={item}
                onClick={() => setCurrentPage(item.toLowerCase())}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.toLowerCase()
                    ? 'text-white border-b-2 border-red-500'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-white text-sm">Welcome, {user.username}</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCurrentPage('login')}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-lg hover:opacity-80 transition-opacity"
            >
              Login
            </button>
          )}
          <div className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 border-r border-b border-gray-400 transform rotate-45"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const CharacterCarousel = ({ characters, selectedCharacter, onCharacterSelect }) => {
  return (
    <div className="fixed left-0 top-20 bottom-0 w-64 bg-black bg-opacity-30 backdrop-blur-sm overflow-y-auto">
      <div className="p-4">
        {characters.map((character) => (
          <div
            key={character.id}
            className={`mb-4 cursor-pointer transition-all duration-300 ${
              selectedCharacter?.id === character.id
                ? 'scale-105 ring-2 ring-red-500'
                : 'hover:scale-102'
            }`}
            onClick={() => onCharacterSelect(character)}
          >
            <div className="relative h-32 rounded-lg overflow-hidden">
              <img
                src={character.image_url}
                alt={character.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-2 left-2 text-white">
                <div className="text-sm font-bold">{character.name}</div>
                <div className="text-xs text-gray-300">{character.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RegionFilter = ({ regions, selectedRegion, onRegionSelect }) => {
  return (
    <div className="fixed right-0 top-20 bottom-0 w-20 flex flex-col items-center justify-center space-y-8">
      {regions.map((region) => (
        <button
          key={region}
          onClick={() => onRegionSelect(region)}
          className={`transform -rotate-90 text-sm font-medium transition-colors ${
            selectedRegion === region
              ? 'text-red-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {region}
        </button>
      ))}
    </div>
  );
};

const HomePage = ({ characters }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('GENSOKYO');
  
  const regions = ['GENSOKYO', 'HAKUREI', 'FOREST', 'MANSION', 'BAMBOO'];

  useEffect(() => {
    if (characters.length > 0 && !selectedCharacter) {
      setSelectedCharacter(characters[0]);
    }
  }, [characters, selectedCharacter]);

  if (!selectedCharacter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading characters...</div>
      </div>
    );
  }

  const backgroundStyle = {
    background: selectedCharacter.color_scheme.background,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={backgroundStyle}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* Character Carousel */}
      <CharacterCarousel
        characters={characters}
        selectedCharacter={selectedCharacter}
        onCharacterSelect={setSelectedCharacter}
      />
      
      {/* Region Filter */}
      <RegionFilter
        regions={regions}
        selectedRegion={selectedRegion}
        onRegionSelect={setSelectedRegion}
      />
      
      {/* Main Content */}
      <div className="relative z-10 pt-32 pb-20 px-8 ml-64 mr-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Character Info */}
            <div className="space-y-6">
              <div>
                <h1 
                  className="text-6xl font-bold mb-4"
                  style={{ color: selectedCharacter.color_scheme.primary }}
                >
                  {selectedCharacter.name.toUpperCase()}
                </h1>
                <div className="w-24 h-1 mb-6" style={{ backgroundColor: selectedCharacter.color_scheme.accent }}></div>
              </div>
              
              <p className="text-gray-200 text-lg leading-relaxed">
                {selectedCharacter.description}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-sm text-gray-300">
                  <span className="font-semibold">Species:</span>
                  <span>{selectedCharacter.species}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-300">
                  <span className="font-semibold">Residence:</span>
                  <span>{selectedCharacter.residence}</span>
                </div>
              </div>
              
              <button 
                className="px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm text-white border border-white border-opacity-30 rounded-lg hover:bg-opacity-30 transition-all duration-300"
              >
                Read more →
              </button>
              
              <div className="flex items-center space-x-4 mt-8">
                <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 bg-opacity-80 text-white rounded-lg hover:bg-opacity-100 transition-all duration-300">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 border-l-2 border-b-2 border-red-600 transform rotate-45"></div>
                  </div>
                  <span className="text-sm">Listen to Theme Song</span>
                </button>
              </div>
              
              <div className="text-xs text-gray-400">
                Theme: "{selectedCharacter.theme_song}"
              </div>
            </div>
            
            {/* Character Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src={selectedCharacter.image_url}
                  alt={selectedCharacter.name}
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06';
                  }}
                />
              </div>
              {/* Glow effect */}
              <div 
                className="absolute inset-0 w-64 h-64 mx-auto my-auto rounded-full opacity-30 blur-3xl"
                style={{ backgroundColor: selectedCharacter.color_scheme.accent }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-px h-8 bg-gray-600"></div>
          <div className="transform -rotate-90 text-xs font-medium tracking-wider">SCROLL</div>
          <div className="w-px h-8 bg-gray-600"></div>
        </div>
      </div>
    </div>
  );
};

const LoginPage = ({ onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.access_token, data.user);
        onBack();
      } else {
        setError(data.detail || 'An error occurred');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
          alt="Mountain landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 opacity-60"></div>
      </div>
      
      {/* Navigation */}
      <nav className="relative z-10 px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-white flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-purple-600 rounded-full mr-3"></div>
            TOUHOU PROJECT
          </div>
          <div className="flex space-x-6">
            {['HOME', 'CHARACTERS', 'LORE', 'MUSIC'].map((item) => (
              <button
                key={item}
                onClick={item === 'HOME' ? onBack : undefined}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8 -mt-20">
        <div className="w-full max-w-md">
          {/* Frosted glass container */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl border border-white border-opacity-20 p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {isLogin ? 'Sign In' : 'Sign Up'}
              </h2>
              <p className="text-gray-300 text-sm">
                {isLogin ? 'Already a member? Welcome back!' : 'Join the Touhou community'}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-red-400 hover:text-red-300 ml-2 underline"
                >
                  {isLogin ? 'Create account' : 'Sign in'}
                </button>
              </p>
            </div>
            
            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-white border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:border-red-400 transition-colors"
                  />
                </div>
              )}
              
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-white border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:border-red-400 transition-colors"
                />
              </div>
              
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-white border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:border-red-400 transition-colors"
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </button>
            </form>
            
            <div className="mt-6">
              <div className="text-center text-gray-300 text-sm mb-4">or continue with</div>
              <div className="flex justify-center space-x-4">
                <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <span className="text-white font-bold text-lg">f</span>
                </button>
                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <span className="text-red-500 font-bold text-lg">G</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [characters, setCharacters] = useState([]);
  const { loading: authLoading } = useAuth();

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/characters`);
      if (response.ok) {
        const data = await response.json();
        setCharacters(data);
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onBack={() => setCurrentPage('home')} />;
      case 'home':
      default:
        return (
          <>
            <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <HomePage characters={characters} />
          </>
        );
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;