import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Facebook, Chrome } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    // Mock signup - store in localStorage
    const userData = {
      email: formData.email,
      password: formData.password,
      signupDate: new Date().toISOString()
    };
    localStorage.setItem('mockUser', JSON.stringify(userData));
    
    toast({
      title: "Success!",
      description: "Account created successfully"
    });
    
    setFormData({ email: '', password: '' });
  };

  const handleSocialLogin = (provider) => {
    toast({
      title: `${provider} Sign Up`,
      description: "Social login will be available soon"
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Glassmorphism Container */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Sign Up</h1>
          <p className="text-white/80 text-sm">
            Already a member?{' '}
            <a href="#login" className="text-blue-300 hover:text-blue-200 transition-colors duration-300 underline">
              Log In
            </a>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/90 text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/90 text-sm font-medium">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/20"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            Sign Up
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="mx-4 text-white/70 text-sm">or</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        {/* Social Login */}
        <div className="flex space-x-4">
          <button
            onClick={() => handleSocialLogin('Facebook')}
            className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            <Facebook className="w-5 h-5 text-blue-300" />
            <span className="text-white/90 text-sm font-medium">Facebook</span>
          </button>
          
          <button
            onClick={() => handleSocialLogin('Google')}
            className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            <Chrome className="w-5 h-5 text-red-300" />
            <span className="text-white/90 text-sm font-medium">Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;