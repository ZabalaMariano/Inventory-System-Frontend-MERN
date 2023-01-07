import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import authService from '../../services/authService';
import './Profile.scss';
import { SET_USER, SET_NAME } from '../../redux/features/auth/authSlice';
import { SpinnerImage } from '../../components/loader/Loader';
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';

export default function Profile() {
  useRedirectLoggedOutUser('/login');

  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      const { user } = await authService.getUser();
      //   console.log('user data', user);

      setProfile(user);
      setIsLoading(false);
      dispatch(SET_USER(user));
      dispatch(SET_NAME(user.name));
    }

    getUserData();
  }, [dispatch]);

  return (
    <div className="profile --my2">
      {isLoading && <SpinnerImage />}
      <>
        {!isLoading && profile === null ? (
          <p>Something went wrong. Please, reload de page.</p>
        ) : (
          <Card cardClass={'card --flex-dir-column'}>
            <span className="profile-photo">
              <img src={profile?.photo} alt="Profile" />
            </span>
            <span className="profile-data">
              <p>
                <b>Name:</b> {profile?.name}
              </p>
              <p>
                <b>Email:</b> {profile?.email}
              </p>
              <p>
                <b>Phone:</b> {profile?.phone}
              </p>
              <p>
                <b>Bio:</b> {profile?.bio}
              </p>
              <div>
                <Link to="/edit-profile">
                  <button className="--btn --btn-primary">Edit Profile</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
}
