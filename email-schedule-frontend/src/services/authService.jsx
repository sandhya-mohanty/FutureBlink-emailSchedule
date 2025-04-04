
const API_URL = 'http://localhost:5000';

export const authService = {
  async register(email, password) {
    const response = await fetch(`${API_URL}/user/register`, {  // Ensure API_URL is used
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Allow cookies
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json();
  },

  async login(email, password) {
    const response = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data;
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  logout() {
    localStorage.removeItem('token');
  }
};
