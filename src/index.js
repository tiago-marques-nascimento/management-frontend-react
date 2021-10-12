import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { combineReducers } from 'redux';
import alert from './shared/reducers/alert';
import confirmation from './shared/reducers/confirmation';
import jwt from './shared/reducers/jwt';
import loading from './shared/reducers/loading';

const store = createStore(
  combineReducers({
    alert,
    confirmation,
    jwt,
    loading
  })
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

export const STORE = store;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
