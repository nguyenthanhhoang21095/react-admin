import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataLocal } from 'src/utils'
import { Redirect, Route } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import api from 'src/services/baseApi'
import endpoint from 'src/services/endpoint'
import Cookies from 'js-cookie';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();

  const token = Cookies.get('access_token');
  const decodedToken = token ? jwt_decode(token) : '';
  const user = decodedToken?.data ?? null;

  useEffect(() => {
    const handleGetUserApi = async () => {
      if (user && user?.id) {
        const res = await api.get(`${endpoint["user"]}/${user.id}`);
        if (res) {
          dispatch({ type: 'GET_USER', userInfo: res })
        }
      }
    }
    handleGetUserApi();
  }, [])

  // Add your own authentication on the below line.
  const userInfo = useSelector(state => state.userInfo);
  const isLoggedIn = (Object.keys(userInfo).length || user) ? true : false;

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute