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
import { css, jsx } from '@emotion/core';
import { FunctionComponent, ReactNode } from 'react';
import { Loading } from '../../shared/components/loading';
import { SideBar } from '../../shared/components/sidebar';

const containerStyles = css`
  margin-left: 64px;
  padding: 0px 20px 100px 20px;
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
