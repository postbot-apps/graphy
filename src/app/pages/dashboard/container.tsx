/**@jsx jsx */
import { useAuth0 } from '@auth0/auth0-react';
import { css, jsx } from '@emotion/core';
import { FunctionComponent, ReactNode } from 'react';
import { Loading } from '../../shared/components/loading';
import { SideBar } from '../../shared/components/sidebar';

const containerStyles = css`
  margin-left: 64px;
  padding: 0px 20px;
`;

const mainStyles = css`
  display: flex;
  max-width: 960px;
  margin: 0 auto;
`;

interface ContainerProps {
  children: ReactNode;
}

const Container: FunctionComponent<ContainerProps> = ({
  children,
}: ContainerProps) => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <SideBar />
      <div css={containerStyles}>
        <div role="main" css={mainStyles}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Container;
