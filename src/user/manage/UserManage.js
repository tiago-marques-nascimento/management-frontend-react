import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import './UserManage.css';
import GenericHttp from '../../shared/http/GenericHttp'
import CheckboxHook from '../../shared/components/checkbox/CheckboxHook'
import { HISTORY } from '../../App'
import { ALERT_SUCCESS, ALERT_ERROR } from '../../shared/components/alert/Alert';
import { ADD_ALERT } from '../../shared/constants/ActionTypes';

class UserManage extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        user: {
          name: '',
          password: '',
          roles: []
        },
        roleCheckboxes: []
      };

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleConfirm = this.handleConfirm.bind(this);
      this.handleCancel = this.handleCancel.bind(this);

      this.http = new GenericHttp();
    }

    componentDidMount() {
      this.http.get('/role').then(roles => {
        this.roles = roles;
        this.roleCheckboxLabels = roles.map(r => {
          return { label: r.name };
        });
    
        if (this.props.name) {
          this.http.get(`/user/${this.props.name}`).then(user => {
            const roleCheckboxes = [];
            this.roles.forEach(role => {
              roleCheckboxes.push(user.roles.filter(r => r.name === role.name).length > 0);
            });

            this.setState({
              user,
              roleCheckboxes
            });
          });
        } else {
          this.setState({
            user: {
              name: '',
              password: '',
              roles: []
            },
            roleCheckboxes: roles.map(() => false)
          });
        }
      });
    }

    componentWillUnmount() {
    }

    handleNameChange(e) {
      this.setState({ ...this.state, user: {...this.state.user, name: e.target.value} });
    }

    handlePasswordChange(e) {
      this.setState({ ...this.state, user: {...this.state.user, password: e.target.value} });
    }

    handleConfirm() {
      const user = {...this.state.user};
      user.roles = []
      this.state.roleCheckboxes.forEach((roleCheckbox, i) => {
        if (roleCheckbox) {
          user.roles.push(this.roles[i]);
        }
      });

      if (this.validate(user)) {
        if(user.id) {
          this.http.post('/user', user).then(() => {
            this.props.dispatchTriggerAlert(ALERT_SUCCESS, 'User successfully saved');
            HISTORY.push('/user');
          });
        } else {
          this.http.put('/user', user).then(() => {
            this.props.dispatchTriggerAlert(ALERT_SUCCESS, 'User successfully saved');
            HISTORY.push('/user');
          });
        }
      }
    }
  
    validate(user) {
      if (!user.name || user.name.length === 0) {
        this.props.dispatchTriggerAlert(ALERT_ERROR, 'Please provide a name');
        return false;
      } else if (!user.password || user.password.length === 0) {
        this.props.dispatchTriggerAlert(ALERT_ERROR, 'Please provide a password');
        return false;
      } else if (user.roles.length === 0) {
        this.props.dispatchTriggerAlert(ALERT_ERROR, 'Please select at least one role');
        return false;
      }
      return true;
    }
  
    handleCancel() {
      HISTORY.push('/user');
    }

    render() {
      return (
        <div>
          <div className="line">
            <div className="row" style={{width:'100%'}}>
              User
            </div>
          </div>
          <hr/>
          <div className="line">
            <div className="row" style={{width:'100%'}}>
              <input onChange={this.handleNameChange} type="text" placeholder="Name" maxLength="100" value={this.state.user.name} disabled={this.props.view}/>
            </div>
          </div>
          <div className="line">
            <div className="row" style={{width:'50%'}}>
              <input onChange={this.handlePasswordChange} type="password" placeholder="Password" maxLength="100" value={this.state.user.password} disabled={this.props.view}/>
            </div>
          </div>
          <div className="line">
            <div id="user-checkboxes" className="row" style={{width:'100%'}}>
              <CheckboxHook multipleSelection={true} options={this.roleCheckboxLabels} value={this.state.roleCheckboxes}  disabled={this.props.view}></CheckboxHook>
            </div>
          </div>
          <div className="line" id="user-buttons">
            {!this.props.view && <div className="row" style={{width:'8%'}}>
              <button id="user-confirm-button" onClick={this.handleConfirm}><i className="fas fa-thumbs-up"></i> Confirm</button>
            </div>}
            <div className="row" style={{width:'8%'}}>
              <button id="user-return-button" onClick={this.handleCancel}><i className="fas fa-thumbs-down"></i> Return</button>
            </div>
          </div>
        </div>
      );
    }
}

UserManage.propTypes = {
  name: PropTypes.string,
  view: PropTypes.bool,
  dispatchTriggerAlert: PropTypes.func,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
