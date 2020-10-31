import { Pane, Heading, Text } from 'evergreen-ui';
import React from 'react';

export const NotFoundPage = () => (
  <Pane
    height="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
  >
    <Heading fontSize="90px">404</Heading>
    <Text marginTop={60} size={400}>
      We are sorry but the page you were looking for was not found!...
    </Text>
  </Pane>
);
