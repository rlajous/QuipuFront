import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionCreators as userActions } from '../../../redux/Auth/actions';

import Login from './layout';

class LoginContainer extends Component {
  handleLogin = e => {
    e.preventDefault();
    const { email, password } = this.props;
    this.props.login({ email, password });
  };

  handleEmailChange = e => {
    const { value } = e.target;
    const { handleEmailChange } = this.props;
    handleEmailChange(value);
  };

  handlePasswordChange = e => {
    const { value } = e.target;
    const { handlePasswordChange } = this.props;
    handlePasswordChange(value);
  };

  render() {
    const { err } = this.props;
    return (
      <Login
        onEmailChange={this.handleEmailChange}
        onPasswordChange={this.handlePasswordChange}
        onLogin={this.handleLogin}
        err={err}
      />
    );
  }
}

LoginContainer.propTypes = {
  email: PropTypes.string,
  err: PropTypes.string,
  handleEmailChange: PropTypes.func,
  handlePasswordChange: PropTypes.func,
  login: PropTypes.func,
  password: PropTypes.string
};

const mapStateToProps = store => ({
  currentUser: store.auth.currentUser,
  email: store.auth.email,
  password: store.auth.password,
  err: store.auth.err
});

const mapDispatchToProps = dispatch => ({
  login: params => dispatch(userActions.login(params)),
  handleEmailChange: params => dispatch(userActions.handleEmailChange(params)),
  handlePasswordChange: params => dispatch(userActions.handlePasswordChange(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
