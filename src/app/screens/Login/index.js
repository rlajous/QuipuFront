import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionCreators as userActions } from '../../../redux/Auth/actions';

import Login from './layout';

class LoginContainer extends Component {
  handleLogin = ({ email, password }) => {
    this.props.login({ email, password });
  };

  render() {
    const { err } = this.props;
    return <Login onLogin={this.handleLogin} err={err} />;
  }
}

LoginContainer.propTypes = {
  err: PropTypes.string,
  login: PropTypes.func
};

const mapStateToProps = store => ({
  err: store.auth.loginErr
});

const mapDispatchToProps = dispatch => ({
  login: params => dispatch(userActions.login(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
