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
import { useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { jsx } from '@emotion/core';
import { Heading, Pane } from 'evergreen-ui';
import { FunctionComponent } from 'react';
import { Loading } from '../../../shared/components/loading';
import Container from '../container';
import { GET_RESPONSES } from './query';
import Responses from './responses';

interface ResponsesPageProps {}

const ResponsesPage: FunctionComponent<ResponsesPageProps> = () => {
  const { user } = useAuth0();
  const { loading, data } = useQuery(GET_RESPONSES, {
    variables: {
      email: user.email,
    },
  });
  if (loading) {
    return <Loading />;
  }

  const responses: any = [];
  data.getUser.workflows.forEach((w: any) => {
    // eslint-disable-next-line prefer-spread
    responses.push.apply(
      responses,
      w.responses.map((r: any) => ({
        ...r,
        workflow: w,
      }))
    );
  });

  return (
    <Container>
      <Pane width="100%">
        <Heading size={800} marginTop="default">
          Responses
        </Heading>
        <Responses responses={responses} />
      </Pane>
    </Container>
  );
};

export default ResponsesPage;
