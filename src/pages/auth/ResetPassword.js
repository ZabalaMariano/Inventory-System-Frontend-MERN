import React, { useState } from 'react';
import styles from './auth.module.scss';
import { MdPassword } from 'react-icons/md';
import Card from '../../components/card/Card.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../../services/authService';
import { useDispatch } from 'react-redux';
import Loader from '../../components/loader/Loader';

const initialState = {
  password: '',
  confirmPassword: '',
};

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { resetToken } = useParams();

  const { password, confirmPassword } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast.error('All fields are required');
    }

    if (password.length < 6) {
      return toast.error('Password must be up to 6 characters');
    }

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    const userData = {
      password,
    };

    setIsLoading(true);

    const data = await authService.resetPassword(userData, resetToken);

    if (data) {
      // console.log(data);
      toast.success(data.message);
      navigate('/login');
    }

    setIsLoading(false);
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>
          <h2>Reset Password</h2>
          <form onSubmit={reset}>
            <input
              type="password"
              placeholder="New Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
            </button>

            <div className={styles.links}>
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
