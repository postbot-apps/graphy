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
import { Global, css, jsx } from '@emotion/core';
import { FunctionComponent, ReactNode } from 'react';
import { Loading } from './shared/components/loading';

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
    return <Loading />;
  }

  return (
    <div>
      <Global styles={globalStyles} />
      {children}
    </div>
  );
};

export default Middleware;
