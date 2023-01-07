import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/auth/ForgotPassword.js';
import Login from './pages/auth/Login.js';
import Register from './pages/auth/Register.js';
import ResetPassword from './pages/auth/ResetPassword.js';
import Home from './pages/Home/Home.js';
import Sidebar from './components/sidebar/Sidebar.js';
import Layout from './components/layout/Layout.js';
import Dashboard from './pages/dashboard/Dashboard.js';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import authService from './services/authService.js';
import { SET_LOGIN } from './redux/features/auth/authSlice.js';
import AddProduct from './pages/addProduct/AddProduct.js';
import ProductDetails from './components/product/productDetails/ProductDetails.js';
import EditProduct from './pages/editProduct/EditProduct.js';
import Profile from './pages/profile/Profile.js';
import EditProfile from './pages/profile/EditProfile.js';
import Contact from './pages/contact/Contact.js';

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const { loggedin } = await authService.getLoginStatus();
      dispatch(SET_LOGIN(loggedin));
    }

    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-product"
          element={
            <Sidebar>
              <Layout>
                <AddProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/product-details/:id"
          element={
            <Sidebar>
              <Layout>
                <ProductDetails />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <Sidebar>
              <Layout>
                <EditProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Sidebar>
              <Layout>
                <Contact />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
