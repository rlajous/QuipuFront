import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavBar from '../NavBar';
import Loader from '../Loader';
import SideBar from '../SideBar';
import { actionCreators as userActions } from '../../../redux/Auth/actions';

import styles from './styles.module.scss';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    const defaultState = { open: false };
    this.state = defaultState;
  }

  componentDidMount() {
    const { hydrateUser, currentUser } = this.props;
    if (currentUser) {
      hydrateUser();
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  toggleDrawer = () => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { user, loading } = this.props;
    const { open } = this.state;
    return (
      <div className={loading ? styles.loading : 'column'}>
        {loading && <Loader />}
        {!!user && !loading && (
          <Fragment>
            <NavBar onDrawerOpen={this.handleDrawerOpen} open={open} />
            <SideBar
              image={user.image}
              open={open}
              onDrawerClose={this.handleDrawerClose}
              toggleDrawer={this.toggleDrawer}
            />
            <div className={`row ${styles.content}`}>{this.props.children}</div>
          </Fragment>
        )}
      </div>
    );
  }
}

Dashboard.propTypes = {
  currentUser: PropTypes.objectOf(),
  hydrateUser: PropTypes.func,
  loading: PropTypes.bool,
  user: PropTypes.objectOf()
};

const mapStateToProps = store => ({
  currentUser: store.auth.currentUser,
  user: store.auth.user,
  loading: store.auth.loading
});

const mapDispatchToProps = dispatch => ({
  hydrateUser: () => dispatch(userActions.hydrateUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
