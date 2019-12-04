import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import Routes from '../../../../constants/routes';

const DEFAULT_PUBLIC_ROUTE = Routes.Login;
const DEFAULT_PRIVATE_ROUTE = Routes.Wallet;

function AuthenticatedRoute({ isPublicRoute, isPrivateRoute, currentUser, component: Comp, ...props }) {
  return (
    <Route
      {...props}
      // eslint-disable-next-line react/jsx-no-bind
      render={routeProps => {
        if (currentUser) {
          if (isPublicRoute) {
            return (
              <Redirect
                to={{
                  pathname: DEFAULT_PRIVATE_ROUTE
                }}
              />
            );
          }
        } else if (isPrivateRoute) {
          return (
            <Redirect
              to={{
                pathname: DEFAULT_PUBLIC_ROUTE
              }}
            />
          );
        }

        return <Comp {...routeProps} />;
      }}
    />
  );
}

AuthenticatedRoute.defaultProps = {
  currentUser: false
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

AuthenticatedRoute.propTypes = {
  ...Route.propTypes, // eslint-disable-line react/forbid-foreign-prop-types
  // eslint-disable-next-line
  component: PropTypes.object,
  currentUser: PropTypes.bool,
  isPrivateRoute: PropTypes.bool,
  isPublicRoute: PropTypes.bool
};

export default withRouter(connect(mapStateToProps)(AuthenticatedRoute));
