import { withAuthenticationRequired } from '@auth0/auth0-react';
import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  RouteProps,
  Switch,
  Route,
} from 'react-router-dom';
import Middleware from './middleware';

const Workflows = React.lazy(() => import('./pages/dashboard/workflows'));

const routes = [
  {
    path: '/',
    component: Workflows,
    isExact: false,
    private: true,
  },
];

const Loading = () => <div style={{ textAlign: 'center' }}>Loading...</div>;

const PrivateRoute = ({ component, ...args }: RouteProps) => (
  <Route
    component={withAuthenticationRequired(component, {
      // eslint-disable-next-line react/display-name
      onRedirecting: () => <Loading />,
    })}
    {...args}
  />
);

const Routes = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Middleware>
          {routes.map((route) =>
            route.private ? (
              <PrivateRoute
                key={route.path}
                exact={route.isExact}
                path={`/${route.path}`}
                component={route.component}
              />
            ) : (
              <Route
                key={route.path}
                exact={route.isExact}
                path={`/${route.path}`}
                component={route.component}
              />
            )
          )}
        </Middleware>
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
