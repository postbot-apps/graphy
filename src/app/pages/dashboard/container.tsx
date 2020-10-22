/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { FunctionComponent, ReactNode } from 'react';
import { SideBar } from '../../shared/components/sidebar';

const containerStyles = css`
  margin-left: 64px;
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
