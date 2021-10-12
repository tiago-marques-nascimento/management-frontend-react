import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import './Login.css';
import jwt_decode from 'jwt-decode';
import GenericHttp from '../shared/http/GenericHttp'
import { HISTORY } from '../App'
import { ALERT_ERROR, ALERT_SUCCESS } from '../shared/components/alert/Alert';
import { ADD_ALERT, LOGIN_JWT } from '../shared/constants/ActionTypes';

function parseJwt(token) {
  const decodedToken = jwt_decode(token);
  return {
    token,
    subject: decodedToken.sub,
    claims: decodedToken.claims
  }
}

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          login: {
            name: '',
            password: ''
          }
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.http = new GenericHttp();
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleNameChange(e) {
        this.setState({ ...this.state, login: {...this.state.login, name: e.target.value} });
    }

    handlePasswordChange(e) {
      this.setState({ ...this.state, login: {...this.state.login, password: e.target.value} });
    }

    handleLogin() {
      if (!this.state.login.name || !this.state.login.password) {
        this.props.dispatchTriggerAlert(ALERT_ERROR, 'Please provide a name and a password');
      } else {
        this.http.post('/login', this.state.login).then(token => {
          const parsedJwt = parseJwt(token);
          this.props.dispatchHandleLogin(
            parsedJwt.token,
            parsedJwt.subject,
            parsedJwt.claims
          );
          this.props.dispatchTriggerAlert(ALERT_SUCCESS, 'You\'ve succesfully logged into User Management! :)');
          HISTORY.push('/home');
        }).catch(() => {
          this.props.dispatchTriggerAlert(ALERT_ERROR, 'Authentication failure');
        });
      }
    }

    render() {
      return (
        <div>
          <div className="line">
            <div className="row" style={{width:'100%'}}>
              Login
            </div>
          </div>
          <div className="line">
            <div className="row" style={{width:'30%'}}>
              <input id="name" onChange={this.handleNameChange} type="text" placeholder="Name" maxLength="100" value={this.state.login.name}/>
            </div>
          </div>
          <div className="line">
            <div className="row" style={{width:'30%'}}>
              <input id="password" onChange={this.handlePasswordChange} type="password" placeholder="Password" maxLength="100" value={this.state.login.password}/>
            </div>
          </div>
          <div className="line">
            <div className="row" style={{width:'8%'}}>
              <button onClick={this.handleLogin}><i className="fas fa-thumbs-up"></i> Login</button>
            </div>
          </div>
        </div>
      );
    }
}

Login.propTypes = {
  dispatchTriggerAlert: PropTypes.func.isRequired,
  dispatchHandleLogin: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  dispatchHandleLogin: (token, subject, claims) => {
      dispatch({
        type: LOGIN_JWT,
        token,
        subject,
        claims
      });
  },
  dispatchTriggerAlert: (type, message) => {
    dispatch({
      type: ADD_ALERT,
      alert: {
        type,
        message
      }
    });
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
