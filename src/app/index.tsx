/*
 * (C) Copyright 2020 Ashik Meerankutty.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Contributors:
 *     Ashik Meerankutty, Shamin Meerankutty
 */

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
const Preview = React.lazy(() => import('./pages/preview'));
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
    path: 'preview/:id',
    component: Preview,
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
