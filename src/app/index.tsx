import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  RouteProps,
  Switch,
  Route,
} from 'react-router-dom';
import Middleware from './middleware';
import { createApolloClient } from './shared/utils/apolloConfig';
import { ApolloProvider } from '@apollo/client';
import { Loading } from './shared/components/loading';

const Workflows = React.lazy(() => import('./pages/dashboard/workflows'));
const Editor = React.lazy(() => import('./pages/editor'));
const HomePage = React.lazy(() => import('./pages/home'));
const Survey = React.lazy(() => import('./pages/survey'));
const Responses = React.lazy(() => import('./pages/dashboard/responses'));
const Response = React.lazy(() => import('./pages/dashboard/responses/response'));

const routes = [
  {
    path: 'workflow/:id',
    component: Editor,
    isExact: false,
    private: true,
  },
  {
    path: 'survey/:id',
    component: Survey,
    isExact: false,
    private: false,
  },
  {
    path: 'responses',
    component: Responses,
    isExact: true,
    private: true,
  },
  {
    path: 'response/:id',
    component: Response,
    isExact: true,
    private: true,
  },
];

const PrivateRoute = ({ component, ...args }: RouteProps) => (
  <Route
    component={withAuthenticationRequired(component, {
      // eslint-disable-next-line react/display-name
      onRedirecting: () => <Loading />,
    })}
    {...args}
  />
);

const App = () => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  return (
    <ApolloProvider
      client={createApolloClient(isAuthenticated ? getIdTokenClaims : null)}
    >
      <Router>
        <Suspense fallback={<Loading />}>
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
              <Route
                exact={true}
                path={'/'}
                component={isAuthenticated ? Workflows : HomePage}
              />
            </Middleware>
          </Switch>
        </Suspense>
      </Router>
    </ApolloProvider>
  );
};

export default App;
