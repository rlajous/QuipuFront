import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionCreators as userActions } from '../../../redux/Auth/actions';

import SignUp from './layout';

class SignUpContainer extends Component {
  onHandleSignUp = ({ email, password }) => {
    console.log({ email, password });
    // const { email, password } = this.props;
    // checkaer que las contrase;as sean iguales
    // this.props.signUp({ email, password });
  };

  render() {
    const { err } = this.props;
    return <SignUp handleSubmit={this.onHandleSignUp} err={err} />;
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
