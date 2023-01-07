import axios from 'axios';
import { toast } from 'react-toastify';

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/v1/users`;

export const validateEmail = (email) => {
  return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
};

// Register User
const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      // Allows saving cookie in browser (set globally in App.js)
      withCredentials: true,
    });

    if (response.statusText === 'OK') {
      toast.success('User Registered Successfully');
    }

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    toast.error(message);
  }
};

// Login User
const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);

    if (response.statusText === 'OK') {
      toast.success('User Logged In Successfully');
    }

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    toast.error(message);
  }
};

// Logout User
const logoutUser = async () => {
  try {
    await axios.get(`${API_URL}/logout`);
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    toast.error(message);
  }
};

// Forgot Password
const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/forgotpassword`, userData);

    if (response.statusText === 'OK') {
      toast.success(response.data.message);
    }

    // console.log('response', response);
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    toast.error(message);
  }
};

// Reset Password
const resetPassword = async (userData, resetToken) => {
  try {
    const response = await axios.patch(
      `${API_URL}/resetpassword/${resetToken}`,
      userData
    );

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    toast.error(message);
  }
};

// Get Login Status
const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/loggedin`);

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    toast.error(message);
  }
};

// Get User Profile
const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/getuser`);

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    toast.error(message);
  }
};

// Update User Profile
const updateUser = async (formData) => {
  try {
    const response = await axios.patch(`${API_URL}/updateuser`, formData);

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    toast.error(message);
  }
};

// Change Password
const changePassword = async (formData) => {
  try {
    const response = await axios.patch(`${API_URL}/changepassword`, formData);

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    toast.error(message);
  }
};

const authService = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getLoginStatus,
  getUser,
  updateUser,
  changePassword,
};

export default authService;
