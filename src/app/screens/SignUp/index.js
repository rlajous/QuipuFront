import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionCreators as userActions } from '../../../redux/Auth/actions';

import SignUp from './layout';

class SignUpContainer extends Component {
  onSignUp = ({ email, password }) => {
    this.props.signUp({ email, password });
  };

  render() {
    const { err } = this.props;
    return <SignUp signUp={this.onSignUp} err={err} />;
  }
}

SignUpContainer.propTypes = {
  err: PropTypes.string,
  signUp: PropTypes.func
};

const mapStateToProps = store => ({
  currentUser: store.auth.currentUser,
  email: store.auth.email,
  password: store.auth.password,
  err: store.auth.err
});

const mapDispatchToProps = dispatch => ({
  signUp: params => dispatch(userActions.signUp(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpContainer);
