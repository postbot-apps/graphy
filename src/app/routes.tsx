import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Middleware from './middleware';

const Workflows = React.lazy(() => import('./pages/dashboard/workflows'));

const routes = [
  {
    path: '/',
    component: Workflows,
    isExact: false,
  },
];

const Routes = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Middleware>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact={route.isExact}
              path={`/${route.path}`}
              component={route.component}
            />
          ))}
        </Middleware>
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
