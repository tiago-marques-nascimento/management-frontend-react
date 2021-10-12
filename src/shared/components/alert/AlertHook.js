import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { REMOVE_ALERT } from '../../constants/ActionTypes';
import './Alert.css';

const ALERT_TIMEOUT = 3000;

export const ALERT_SUCCESS = 1;
export const ALERT_WARNING = 2;
export const ALERT_ERROR = 3;

export default function AlertHook() {

  var alertsBefore = [];
  const alerts = useSelector(state => state.alert.alerts) ?? [];

  const dispatch = useDispatch();

  useEffect(() => {
    alerts
      .filter(alert => !alertsBefore || !alertsBefore.includes(alert))
      .forEach(alert => {
        setTimeout(() => {
          dispatch({ type: REMOVE_ALERT, alert });
        }, ALERT_TIMEOUT);
      });
    alertsBefore = alerts;
  });

  return (
    <div className="alert">
      {alerts && alerts.map((alert, i) => (
        <div key={i}>
          <div className={(alert.type === ALERT_SUCCESS) ? 'alert-success' : (alert.type === ALERT_WARNING) ? 'alert-warning' : 'alert-error'}>
            {(alert.type === ALERT_SUCCESS) ? 'Success: ' : (alert.type === ALERT_WARNING) ? 'Warning: ' : 'Error: '}
            {alert.message}
          </div>
        </div>
      ))}
    </div>
  );
}
