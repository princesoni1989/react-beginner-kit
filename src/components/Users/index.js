import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import fetchUsers from '../../actions/users';
import {browserHistory} from 'react-router';
import cookie from 'react-cookie';

import './style.scss';
class Users extends Component {
  componentDidMount () {
    const token = cookie.load('token')
    this.props.getUsers({'x-access-token': token});
  }

  logOut = () => {
    cookie.remove('token');
    browserHistory.push('/login')
  }
  render () {
    let {users} = this.props;
    console.log(users)
    return (
      <div>
        <nav>
          <ul>
            <li><a onClick={this.logOut}>Logout</a></li>
          </ul>
        </nav>
        <table className='users'>
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Email</th>
            </tr>
          </thead>
          <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

Users.propTypes = {
  users: PropTypes.array,
  getUsers: PropTypes.func,
};

Users.defaultProps = {
  users: [],
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users.userList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: bindActionCreators(fetchUsers, dispatch),
  };
};

Users.need = [
  fetchUsers,
];

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);

