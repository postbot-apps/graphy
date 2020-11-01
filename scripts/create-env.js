/* eslint-disable no-undef */
const fs = require('fs');
fs.writeFileSync('./.env', `SLASH_GRAPHQL_URL=${process.env.SLASH_GRAPHQL_URL}\n`);
fs.writeFileSync('./.env', `AUTH0_DOMAIN=${process.env.AUTH0_DOMAIN}\n`);
fs.writeFileSync('./.env', `AUTH0_CLIENT_ID=${process.env.AUTH0_CLIENT_ID}\n`);
fs.writeFileSync('./.env', `AUTH0_AUDIENCE=${process.env.AUTH0_AUDIENCE}\n`);
fs.writeFileSync('./.env', `APP_ENDPOINT=${process.env.APP_ENDPOINT}\n`);
