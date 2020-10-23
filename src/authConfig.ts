export interface AuthConfigInterface {
  AUTH0_DOMAIN: string;
  AUTH0_CLIENT_ID: string;
  AUTH0_AUDIENCE: string;
}

export const AuthConfig: AuthConfigInterface = {
  AUTH0_DOMAIN: 'graphy-app.us.auth0.com',
  AUTH0_CLIENT_ID: '9xs2YCenP15tL92M5pnkzLymw3aAAA3f',
  AUTH0_AUDIENCE: 'https://graphy-app.us.auth0.com/api/v2/',
};
