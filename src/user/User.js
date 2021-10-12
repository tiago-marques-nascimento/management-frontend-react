import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import './User.css';
import GenericHttp from '../shared/http/GenericHttp'
import TableHook from '../shared/components/table/TableHook'
import { HISTORY } from '../App'
import { ALERT_SUCCESS } from '../shared/components/alert/Alert';
import { ADD_ALERT } from '../shared/constants/ActionTypes';

class User extends React.Component {

    constructor(props) {
      super(props);

      this.userColumns = [
        {label: 'Name', value: 'name', length: '40%'},
        {label: 'Password', value: 'password', length: '20%'},
        {label: 'Roles', value: 'roles', length: '30%'}
      ];

      this.state = {
        users: []
      };

      this.handleAdd = this.handleAdd.bind(this);
      this.handleView = this.handleView.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
      this.handleOrderByName = this.handleOrderByName.bind(this);

      this.http = new GenericHttp();
    }

    componentDidMount() {
      this.listUsers();
    }

    componentWillUnmount() {
    }

    handleAdd() {
      HISTORY.push('/user/add');
    }

    handleView(user) {
      HISTORY.push(`/user/view/${user.name}`);
    }

    handleEdit(user) {
      HISTORY.push(`/user/edit/${user.name}`);
    }

    handleRemove(user) {
      this.http.delete(`/user/${user.id}`).then(() => {
        this.props.dispatchTriggerAlert(ALERT_SUCCESS, 'User successfully deleted');
        this.listUsers();
      });
    }

    handleOrderByName() {
      this.setState({
        users: [...this.state.users.sort((u1, u2) => {
          if ((u1.name && u2.name) && u1.name.toUpperCase() > u2.name.toUpperCase()) {
            return 1;
          }
          else if ((u1.name && u2.name) && u1.name.toUpperCase() < u2.name.toUpperCase()) {
            return -1;
          }
          return 0;
        })]
      });
    }

    listUsers() {
      this.http.get('/user').then(users => {
        this.setState({ users: users.map(u => {
          return {id: u.id, name: u.name, password: u.password ? '****' : '', roles: u.roles.map(r => r.name).join(',')};
        })})
      });
    }

    render() {
      return (
        <div>
          <div className="line">
            <div className="row" style={{width:'100%'}}>
              Available Users
            </div>
          </div>
          <hr/>
          <div className="line">
            <div className="row" style={{width:'100%'}}>
              <button onClick={this.handleOrderByName}><i className="fas fa-search"></i> Order users by name</button>
            </div>
          </div>
          <div className="line" id='users-table'>
            <div className="row" style={{width:'100%'}}>
              <TableHook columns={this.userColumns} list={this.state.users} viewHandler={this.handleView} editHandler={this.handleEdit} removeHandler={this.handleRemove}></TableHook>
            </div>
          </div>
          <div className="line">
            <div className="row" style={{width:'100%'}}>
              <button onClick={this.handleAdd}><i className="fas fa-plus"></i> New user</button>
            </div>
          </div>
        </div>
      );
    }
}

User.propTypes = {
  dispatchTriggerAlert: PropTypes.func
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

export default connect(mapStateToProps, mapDispatchToProps)(User);
