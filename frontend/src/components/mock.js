// Mock data for the glassmorphism signup page

export const mockUserData = {
  users: [
    {
      id: 1,
      email: 'user@example.com',
      password: 'hashedPassword123',
      signupDate: '2024-01-15T10:30:00Z',
      loginMethod: 'email'
    }
  ]
};

export const mockSocialProviders = {
  facebook: {
    enabled: false,
    clientId: 'mock_facebook_client_id'
  },
  google: {
    enabled: false,
    clientId: 'mock_google_client_id'
  }
};

// Mock functions
export const mockSignUp = async (email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
  
  // Mock success response
  return {
    success: true,
    user: {
      id: Date.now(),
      email,
      signupDate: new Date().toISOString()
    },
    message: 'Account created successfully'
  };
};

export const mockSocialLogin = async (provider) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    success: true,
    message: `${provider} login will be available soon`,
    provider
  };
};