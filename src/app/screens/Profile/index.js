import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import Dashboard from '../../components/Dashboard';

import Profile from './layout';

class ProfileContainer extends Component {
  componentDidMount() {}

  render() {
    return (
      <Dashboard>
        <Profile />
      </Dashboard>
    );
  }
}

ProfileContainer.propTypes = {};

const mapStateToProps = store => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
