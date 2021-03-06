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

/**@jsx jsx */
import { useAuth0 } from '@auth0/auth0-react';
import { jsx, css } from '@emotion/core';
import { Button, Card, Heading, Pane, Text } from 'evergreen-ui';
import { FunctionComponent } from 'react';
import LogoColored from '../../../assets/images/logo-colored.png';
import LoginBackground from '../../../assets/images/login-bg.png';

interface HomePageProps {}

const loginButtonStyles = css`
  background: #09143e;
  color: #fff;
  transition: 0.5s ease;
  &:hover {
    background: #0a1233 !important;
    transition: 0.5s ease;
  }
`;

const pageBackground = css`
  background-image: url(${LoginBackground});
  background-repeat: no-repeat;
  background-position: center;
  min-width: 400px;
`;

const HomePage: FunctionComponent<HomePageProps> = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Pane
      css={pageBackground}
      display="flex"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Card
        height={300}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        padding={40}
        margin={20}
        elevation={2}
      >
        <img
          src={LogoColored}
          css={css`
            margin: 0 auto;
          `}
          height={70}
          alt="logo image"
        />
        <Heading size={800}>Graphy</Heading>
        <Text textAlign="center" width={300} display="block" marginTop={20}>
          Turn your workflows into amazing forms and surveys
        </Text>
        <Button
          marginTop={20}
          css={loginButtonStyles}
          onClick={() =>
            loginWithRedirect({
              returnTo: window.location.origin,
            })
          }
        >
          Login to continue
        </Button>
      </Card>
    </Pane>
  );
};

export default HomePage;
