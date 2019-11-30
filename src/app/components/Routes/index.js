import React, { lazy } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';

import { history } from '../../../redux/store';
import Suspense from '../Suspense';
import Routes from '../../../constants/routes';

import AuthenticatedRoute from './components/AuthenticatedRoute';
import styles from './styles.scss';

const Login = lazy(() => import('../../screens/Login'));
const Register = lazy(() => import('../../screens/Register'));
const RecoverPassword = lazy(() => import('../../screens/RecoverPassword'));
const Transactions = lazy(() => import('../../screens/Transactions'));
const MarketPlace = lazy(() => import('../../screens/MarketPlace'));
const Profile = lazy(() => import('../../screens/Profile'));
const Configuration = lazy(() => import('../../screens/Configuration'));

function AppRoutes() {
  return (
    <ConnectedRouter history={history}>
      <div className={styles.container}>
        <Suspense>
          <Switch>
            <AuthenticatedRoute isPublicRoute exact path={Routes.Login} component={Login} />
            <AuthenticatedRoute isPublicRoute exact path={Routes.Register} component={Register} />
            <AuthenticatedRoute
              isPublicRoute
              exact
              path={Routes.RecoverPassword}
              component={RecoverPassword}
            />
            <AuthenticatedRoute isPrivateRoute exact path={Routes.Transactions} component={Transactions} />
            <AuthenticatedRoute isPrivateRoute exact path={Routes.MarketPlace} component={MarketPlace} />
            <AuthenticatedRoute isPrivateRoute exact path={Routes.Configuration} component={Configuration} />
            <AuthenticatedRoute isPrivateRoute path={Routes.Profile} component={Profile} />
          </Switch>
        </Suspense>
      </div>
    </ConnectedRouter>
  );
}

export default AppRoutes;
