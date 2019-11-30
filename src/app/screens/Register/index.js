import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionCreators as userActions } from '../../../redux/Auth/actions';

import SignUp from './layout';

class SignUpContainer extends Component {
  handleSignUp = e => {
    e.preventDefault();
    const { email, password } = this.props;
    // checkaer que las contrase;as sean iguales
    this.props.signUp({ email, password });
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

  handleConfirmPasswordChange = e => {
    const { value } = e.target;
    const { handleConfirmPasswordChange } = this.props;
    handleConfirmPasswordChange(value);
  };

  render() {
    const { err } = this.props;
    return (
      <SignUp
        onEmailChange={this.handleEmailChange}
        onPasswordChange={this.handlePasswordChange}
        onSignUp={this.handleSignUp}
        onConfirmPasswordChange={this.handleConfirmPasswordChange}
        err={err}
      />
    );
  }
}

SignUpContainer.propTypes = {
  confirmPassword: PropTypes.string,
  email: PropTypes.string,
  err: PropTypes.string,
  handleConfirmPasswordChange: PropTypes.func,
  handleEmailChange: PropTypes.func,
  handlePasswordChange: PropTypes.func,
  password: PropTypes.string,
  signUp: PropTypes.func
};

const mapStateToProps = store => ({
  currentUser: store.auth.currentUser,
  email: store.auth.email,
  password: store.auth.password,
  confirmPassword: store.auth.confirmPassword,
  err: store.auth.err
});

const mapDispatchToProps = dispatch => ({
  signUp: params => dispatch(userActions.signUp(params)),
  handleEmailChange: params => dispatch(userActions.handleEmailChange(params)),
  handlePasswordChange: params => dispatch(userActions.handlePasswordChange(params)),
  handleConfirmPasswordChange: params => dispatch(userActions.handleConfirmPasswordChange(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpContainer);
