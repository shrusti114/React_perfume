import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

/* ── Axios instance with auth interceptor ── */
const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ── Auth Service ── */
const authService = {
  async login(credentials) {
    try {
      const { data } = await api.post('/auth/login', credentials);
      return data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  async register(userData) {
    try {
      const { data } = await api.post('/auth/register', userData);
      return data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  async getProfile() {
    try {
      const { data } = await api.get('/users/profile');
      return data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
  },

  async updateProfile(profileData) {
    try {
      const { data } = await api.put('/users/profile', profileData);
      return data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  },

  async changePassword(passwords) {
    try {
      const { data } = await api.post('/users/change-password', passwords);
      return data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to change password' };
    }
  },

  async sendOtp(email) {
    try {
      const { data } = await api.post('/auth/send-otp', { email });
      return data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to send OTP' };
    }
  },

  async verifyOtp(email, otp) {
    try {
      const { data } = await api.post('/auth/verify-otp', { email, otp });
      return data;
    } catch (error) {
      throw error.response?.data || { message: 'Verification failed' };
    }
  },
};

export default authService;
export { api };
