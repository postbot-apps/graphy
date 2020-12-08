# Graphy

Graphy is an all in one workflow management tool backed with Slash graphql.

![Graphy Workflows](https://github.com/postbot-apps/graphy/blob/main/screenshots/Workflow%20Editor%20-%20Graph.png)

The app is deployed at [https://graphy.surge.sh](https://graphy.surge.sh)

## Quick Start


This app requires NodeJS. Before continuing, [download and install Node.js](https://nodejs.org/en/download/). Node.js 10 or higher is required.
.


### Update environment variables

```
  cp .env.example .env
```

```
SLASH_GRAPHQL_URL=`Your slash graphql endpoint`

AUTH0_DOMAIN=`Your Auth0 domain`
AUTH0_CLIENT_ID=`Your Auth0 client ID`
AUTH0_AUDIENCE=`Your Auth0 audience url`

APP_ENDPOINT=`Your app endpoint`
```


### Install dependencies

```
npm install
```

### Start the development server

```
npm start
```
view graphy at [http://localhost:8080/](http://localhost:8080/)

### Demo user account

```
  email: ashik.meerankutty@gmail.com
  password: H6Pd672crXY8z4Q@
```

## Screenshots

App screenshots are available [here](https://github.com/postbot-apps/graphy/tree/main/screenshots)

## Features

- Ability to create workflows with graphs and use them to power surveys, graphs, forms and much more.
- Super simple drag and drop graph creation.
- Ability to view the responses from surveys, forms etc.
- Secure authentication with Auth0.
- Amazing UI.
- Super fast with lazy loading and graphql caching.

## License

[APACHE 2.0](http://www.apache.org/licenses/LICENSE-2.0)
