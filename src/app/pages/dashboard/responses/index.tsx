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
import { WorkflowItem } from './types';

interface ResponsesPageProps {}

const ResponsesPage: FunctionComponent<ResponsesPageProps> = () => {
  const { user } = useAuth0();
  const { loading, error, data } = useQuery(GET_RESPONSES, {
    variables: {
      email: user.email,
    },
  });
  if (loading) {
    return <Loading />;
  }

  const responses: any = [];
  data.getUser.workflows.forEach((w) => {
    responses.push.apply(responses, (
      w.responses.map((r) => ({
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
