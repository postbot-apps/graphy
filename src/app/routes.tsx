import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Dashboard = React.lazy(() => import('./pages/dashboard'));

const routes = [
  {
    path: '/',
    component: Dashboard,
    isExact: false,
  },
];

const Routes = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.path}
            exact={route.isExact}
            path={`/${route.path}`}
            component={route.component}
          />
        ))}
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
