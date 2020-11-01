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

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthConfig } from './authConfig';

ReactDOM.render(
  <Auth0Provider
    domain={AuthConfig.AUTH0_DOMAIN}
    clientId={AuthConfig.AUTH0_CLIENT_ID}
    audience={AuthConfig.AUTH0_AUDIENCE}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('app')
);
