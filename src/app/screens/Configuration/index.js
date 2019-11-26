import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionCreators as userActions } from '../../../redux/Auth/actions';
import Dashboard from '../../components/Dashboard';

import Configuration from './layout';

class ConfigurationContainer extends Component {
  handleLogOut = values => {
    this.props.logout(values);
  };

  handleEdit = e => {
    e.preventDefault();
    const { newEmail: email, newPasword: password } = this.props;
    this.props.edit({ email, password });
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
    return (
      <Dashboard>
        <Configuration
          onEmailChange={this.handleEmailChange}
          onPasswordChange={this.handlePasswordChange}
          onEdit={this.handleEdit}
          onLogout={this.handleLogOut}
        />
      </Dashboard>
    );
  }
}

ConfigurationContainer.propTypes = {
  edit: PropTypes.func,
  handleEmailChange: PropTypes.func,
  handlePasswordChange: PropTypes.func,
  logout: PropTypes.func,
  newEmail: PropTypes.string,
  newPasword: PropTypes.string
};

const mapStateToProps = store => ({
  currentUser: store.auth.currentUser,
  newEmail: store.auth.email,
  newPasword: store.auth.password,
  err: store.auth.err
});

const mapDispatchToProps = dispatch => ({
  logout: params => dispatch(userActions.logout(params)),
  edit: params => dispatch(userActions.edit(params)),
  handleEmailChange: params => dispatch(userActions.handleEmailChange(params)),
  handlePasswordChange: params => dispatch(userActions.handlePasswordChange(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigurationContainer);
