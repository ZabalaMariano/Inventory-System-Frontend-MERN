import React, { useState } from 'react';
import './ChangePassword.scss';
import { toast } from 'react-toastify';
import authService from '../../services/authService';
import Card from '../card/Card';
import { useNavigate } from 'react-router-dom';

const initialState = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export default function ChangePassword() {
  const navigate = useNavigate();
  const [formData, setformData] = useState(initialState);
  const { oldPassword, newPassword, confirmPassword } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const changePass = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error('New passwords do not match');
    }

    const formData = {
      oldPassword,
      newPassword,
    };

    const data = await authService.changePassword(formData);
    // console.log('DATA', data);
    toast.success('Password changed successfully');
    navigate('/profile');
  };

  return (
    <div className="change-password">
      <Card cardClass={'password-card'}>
        <h3>Change Password</h3>
        <form onSubmit={changePass} className="--form-control">
          <input
            type="password"
            placeholder="Old Password"
            required
            name="oldPassword"
            value={oldPassword}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="New Password"
            required
            name="newPassword"
            value={newPassword}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            required
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
          />
          <button type="submit" className="--btn --btn-primary">
            Change Password
          </button>
        </form>
      </Card>
    </div>
  );
}
