import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import './LoginWidget.css';
import { ALERT_SUCCESS } from '../alert/Alert'
import { ADD_ALERT, LOGOUT_JWT } from '../../constants/ActionTypes'

class LoginWidget extends React.Component {

  constructor(props) {
      super(props);

      this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handleLogout() {
    this.props.dispatchHandleLogout();
    this.props.dispatchHandleLogoutMessage();
  }

  render() {
    const login = (this.props.token) ? true : false;
    const subject = this.props.subject;
    return (
      <div>
        {login && <div className="login-widget">
          Hello {subject}, welcome to User Management. Click <a onClick={this.handleLogout}>here</a> to log out...
        </div>}
      </div>
    );
  }
}

LoginWidget.propTypes = {
  dispatchHandleLogout: PropTypes.func,
  dispatchHandleLogoutMessage: PropTypes.func,
  token: PropTypes.string,
  subject: PropTypes.string
};

const mapStateToProps = state => ({
  token: state.jwt.token,
  subject: state.jwt.subject,
});

const mapDispatchToProps = dispatch => ({
  dispatchHandleLogout: () => {
    dispatch({
      type: LOGOUT_JWT
    });
  },
  dispatchHandleLogoutMessage: () => {
    dispatch({
      type: ADD_ALERT,
      alert: {type: ALERT_SUCCESS, message: 'Successful logout attempt'}
    });
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginWidget);
