import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './LoginWidget.css';
import { ALERT_SUCCESS } from '../alert/Alert'
import { ADD_ALERT, LOGOUT_JWT } from '../../constants/ActionTypes'

export default function LoginWidgetHook() {

  const token = useSelector(state => state.jwt.token);
  const subject = useSelector(state => state.jwt.subject);
  
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: LOGOUT_JWT });
    dispatch({
      type: ADD_ALERT,
      alert: {type: ALERT_SUCCESS, message: 'Successful logout attempt'}
    });
  }

  const login = (token) ? true : false;
  return (
    <div>
      {login && <div className="login-widget">
        Hello {subject}, welcome to User Management. Click <a onClick={handleLogout}>here</a> to log out...
      </div>}
    </div>
  );
}
