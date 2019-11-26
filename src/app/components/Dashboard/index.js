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
    const { hydrateCompany, currentUser } = this.props;
    if (currentUser) {
      hydrateCompany();
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
    const { company, loading } = this.props;
    const { open } = this.state;
    return (
      <div className={loading ? styles.loading : 'column'}>
        {loading && <Loader />}
        {!!company && !loading && (
          <Fragment>
            <NavBar onDrawerOpen={this.handleDrawerOpen} open={open} />
            <SideBar
              image={company.image}
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
  company: PropTypes.objectOf(),
  currentUser: PropTypes.objectOf(),
  hydrateCompany: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = store => ({
  currentUser: store.auth.currentUser,
  company: store.auth.company,
  loading: store.auth.loading
});

const mapDispatchToProps = dispatch => ({
  hydrateCompany: () => dispatch(userActions.hydrateCompany())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
