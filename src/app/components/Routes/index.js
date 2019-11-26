import React, { lazy } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';

import { history } from '../../../redux/store';
import Suspense from '../Suspense';
import Routes from '../../../constants/routes';

import AuthenticatedRoute from './components/AuthenticatedRoute';
import styles from './styles.scss';

const Login = lazy(() => import('../../screens/Login'));
const Cars = lazy(() => import('../../screens/Cars'));
const Statistics = lazy(() => import('../../screens/Statistics'));
const Home = lazy(() => import('../../screens/Home'));
const Configuration = lazy(() => import('../../screens/Configuration'));

function AppRoutes() {
  return (
    <ConnectedRouter history={history}>
      <div className={styles.container}>
        <Suspense>
          <Switch>
            <AuthenticatedRoute isPublicRoute exact path={Routes.LOGIN} component={Login} />
            <AuthenticatedRoute isPrivateRoute path={Routes.CARS} component={Cars} />
            <AuthenticatedRoute isPrivateRoute path={Routes.STATISTICS} component={Statistics} />
            <AuthenticatedRoute isPrivateRoute path={Routes.CONFIGURATION} component={Configuration} />
            <AuthenticatedRoute isPrivateRoute path={Routes.HOME} component={Home} />
          </Switch>
        </Suspense>
      </div>
    </ConnectedRouter>
  );
}

export default AppRoutes;
