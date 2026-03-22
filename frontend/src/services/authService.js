import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const authService = {
  async login(credentials) {
    try {
      const response = await axios.post(`${API_BASE}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  async register(userData) {
    try {
      const response = await axios.post(`${API_BASE}/auth/register`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  }
};

export default authService;

