import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import login from '../../../actions/authentication';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import cookie from 'react-cookie';

import './style.scss';

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      inputFields: ['email', 'password'],
      type: 'password',
    };
  }

  componentWillMount () {
    const {inputFields} = this.state;
    inputFields.map(input => {
      this.setState({
        [input]: '',
      });
    });
  }

  changeHandler = (value, property) => {
    this.setState({
      [property]: value,
    });
  };

  render () {
    const {email, password, type} = this.state;
    const showPassword = () => {
      this.setState({
        type: type === 'password' ? 'text' : 'password',
      });
    };
    const handleLogin = async () => {
     await  this.props.userLogin({
        email,
        password,
      });
      cookie.save('token', this.props.response.token);
      if (this.props.login) {
        browserHistory.push('/users');
      }
    };

    return (
      <div className='login-form-container'>
        <div className='seperator-line'>
          <h1 className='heading'>Login Form</h1>
        </div>
        <p className='form-group text-danger'>
        </p>
        <ul className='login-form'>
          <li className='form-group'>
            <input className='form-control' id='email' type='email' name='email' placeholder='Email' ref='email'
                   onChange={(e) => this.changeHandler(e.target.value, 'email')} required />
          </li>
          <li className='form-group'>
            <input className='form-control' id='password' type={this.state.type} name='password' placeholder='Password'
                   ref='password'
                   onChange={(e) => this.changeHandler(e.target.value, 'password')} required />
            <span className='show-password' onClick={showPassword}>SHOW</span>
          </li>
          <li className='form-group txt-center'>
            <button className='btn-default' onClick={() => handleLogin()}>Login</button>
          </li>
          <li className='form-group txt-center'>
            <Link to='/signup' className='form-link'>Not a member yet? <span>Register</span></Link>
          </li>
        </ul>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.Boolean,
  userLogin: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  return {
    login: state.authentication.status,
    response: state.authentication.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: bindActionCreators(login, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
