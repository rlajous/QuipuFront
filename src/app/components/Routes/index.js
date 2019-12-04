import React, { lazy } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';

import { history } from '../../../redux/store';
import Suspense from '../Suspense';
import Routes from '../../../constants/routes';

import AuthenticatedRoute from './components/AuthenticatedRoute';
import styles from './styles.scss';

const Login = lazy(() => import('../../screens/Login'));
const SignUp = lazy(() => import('../../screens/SignUp'));
const Orders = lazy(() => import('../../screens/Orders'));
const MarketPlace = lazy(() => import('../../screens/MarketPlace'));
const Wallet = lazy(() => import('../../screens/Wallet'));
const Configuration = lazy(() => import('../../screens/Configuration'));

function AppRoutes() {
  return (
    <ConnectedRouter history={history}>
      <div className={styles.container}>
        <Suspense>
          <Switch>
            <AuthenticatedRoute isPublicRoute exact path={Routes.Login} component={Login} />
            <AuthenticatedRoute isPublicRoute exact path={Routes.SignUp} component={SignUp} />
            <AuthenticatedRoute isPrivateRoute exact path={Routes.Orders} component={Orders} />
            <AuthenticatedRoute isPrivateRoute exact path={Routes.MarketPlace} component={MarketPlace} />
            <AuthenticatedRoute isPrivateRoute exact path={Routes.Configuration} component={Configuration} />
            <AuthenticatedRoute isPrivateRoute path={Routes.Wallet} component={Wallet} />
          </Switch>
        </Suspense>
      </div>
    </ConnectedRouter>
  );
}

export default AppRoutes;
