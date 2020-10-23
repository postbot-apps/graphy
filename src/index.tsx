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
