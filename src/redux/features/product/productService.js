import axios from 'axios';
import { toast } from 'react-toastify';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/v1/products`;

// Create Product
const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get All Products
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data.products;
};

// Delete Product
const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

// Get Product
const getProduct = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update Product
const updateProduct = async (formData, id) => {
  const response = await axios.patch(`${API_URL}/${id}`, formData);
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct,
};

export default productService;
