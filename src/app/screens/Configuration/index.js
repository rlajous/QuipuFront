import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionCreators as modalActions } from '../../../redux/Modal/actions';
import { actionCreators as userActions } from '../../../redux/Auth/actions';
import Dashboard from '../../components/Dashboard';
import { propTypes } from '../../../redux/Auth/reducer';

import Configuration from './layout';

class ConfigurationContainer extends Component {
  componentDidMount() {
    const { handleBuyModalChange, handleSellModalChange } = this.props;
    handleBuyModalChange(false);
    handleSellModalChange(false);
  }

  handleLogOut = values => {
    this.props.logout(values);
  };

  handleEdit = ({ newEmail: email, password }) => {
    this.props.edit({ email, password });
  };

  render() {
    const { user, err, success, loading } = this.props;
    return (
      <Dashboard>
        <Configuration
          onEdit={this.handleEdit}
          onLogout={this.handleLogOut}
          user={user}
          initialValues={{ newEmail: user && user.email }}
          success={success}
          error={err}
          loading={loading}
        />
      </Dashboard>
    );
  }
}

ConfigurationContainer.propTypes = {
  edit: PropTypes.func,
  err: PropTypes.string,
  handleBuyModalChange: PropTypes.func,
  handleSellModalChange: PropTypes.func,
  loading: PropTypes.bool,
  logout: PropTypes.func,
  success: PropTypes.bool,
  user: propTypes.user
};

const mapStateToProps = store => ({
  currentUser: store.auth.currentUser,
  user: store.auth.user,
  newEmail: store.auth.email,
  newPasword: store.auth.password,
  err: store.auth.err,
  success: store.auth.success,
  loading: store.auth.editLoading
});

const mapDispatchToProps = dispatch => ({
  logout: params => dispatch(userActions.logout(params)),
  edit: params => dispatch(userActions.edit(params)),
  handleSellModalChange: params => dispatch(modalActions.handleSellModalChange(params)),
  handleBuyModalChange: params => dispatch(modalActions.handleBuyModalChange(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigurationContainer);
