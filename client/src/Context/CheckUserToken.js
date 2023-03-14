/* eslint-disable import/prefer-default-export */
/* eslint-disable no-alert */
/* eslint-disable no-console */

import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router';

export function userToken() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const verifyUser = () => {
    if (!cookies.jwt) {
      navigate('/');
    } else {
      axios.post(
        '/api/auth',
        {},
        { withCredentials: true },
      ).then((response) => {
        // eslint-disable-next-line no-unused-vars
        if (!response.data.status) {
          removeCookie('jwt');
          navigate('/');
        }
      });
    }
  };
  return verifyUser;
}
