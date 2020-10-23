/**@jsx jsx */
import { useAuth0 } from '@auth0/auth0-react';
import { Global, css, jsx } from '@emotion/core';
import { FunctionComponent, ReactNode } from 'react';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
  body {
    color: rgb(23, 43, 77);
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }
`;

interface MiddlewareProps {
  children?: ReactNode;
}

const Middleware: FunctionComponent<MiddlewareProps> = ({
  children,
}: MiddlewareProps) => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Global styles={globalStyles} />
      {children}
    </div>
  );
};

export default Middleware;
