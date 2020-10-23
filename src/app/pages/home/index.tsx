/**@jsx jsx */
import { useAuth0 } from '@auth0/auth0-react';
import { jsx } from '@emotion/core';
import { Button } from 'evergreen-ui';
import { FunctionComponent } from 'react';

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <Button
        onClick={() =>
          loginWithRedirect({
            returnTo: window.location.origin,
          })
        }
      >
        Login
      </Button>
    </div>
  );
};

export default HomePage;
