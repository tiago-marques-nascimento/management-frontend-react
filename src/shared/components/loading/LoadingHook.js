import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'
import './Loading.css';

export default function LoadingHook() {

  const counter = useSelector(state => state.loading.counter);

  const enabled = counter > 0;
  return (
  <div>
    {enabled && <div className="loading-background">
      <i className="fas fa-spinner loading-item"></i>
    </div>}
  </div>
  );
}

LoadingHook.propTypes = {
  counter: PropTypes.number
};
