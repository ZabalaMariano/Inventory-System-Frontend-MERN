import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SET_LOGIN } from '../redux/features/auth/authSlice';
import authService from '../services/authService';

const useRedirectLoggedOutUser = (path) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function redirectLoggedOutUser() {
      const { loggedin } = await authService.getLoginStatus();
      dispatch(SET_LOGIN(loggedin));

      if (!loggedin) {
        toast.info('Session expired. Please, login.');
        navigate(path);
        return;
      }
    }

    redirectLoggedOutUser();
  }, [dispatch, navigate, path]);
};

export default useRedirectLoggedOutUser;
