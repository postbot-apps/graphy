/**@jsx jsx */
import { useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { css, jsx } from '@emotion/core';
import { Button } from 'evergreen-ui';
import { FunctionComponent, useEffect, useState } from 'react';
import Container from '../container';
import { GET_WORKFLOWS } from './query';
import WorkflowCard from './workflowCard';
import WorkflowModal from './workflowModal';

const workflowStyles = css`
  margin-top: 20px;
  width: 100%;
`;

const headerStyles = css`
  display: grid;
  grid-template-columns: 1fr 100px;
  width: 100%;
  .header__heading {
    font-size: 20px;
    font-weight: 400;
  }
`;

const workflowsContainer = css`
  margin-top: 40px;
  display: grid;
  grid-gap: 30px 15px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

interface WorkflowsProps {}

const Workflows: FunctionComponent<WorkflowsProps> = () => {
  const [workflowsData, setWorkflowsData] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const { user } = useAuth0();

  const { loading, error, data } = useQuery(GET_WORKFLOWS, {
    variables: {
      email: user.email,
    },
  });

  const getData = () => {
    if (loading) {
      return null;
    }
    if (error) {
      console.error(`GET_WORKFLOWS error: ${error}`);
      return `Error: ${error.message}`;
    }
    if (data && data.getUser) {
      setWorkflowsData(data.getUser.workflows);
    }
  };

  useEffect(() => {
    getData();
  }, [data, user]);

  return (
    <Container>
      <div css={workflowStyles}>
        <div css={headerStyles}>
          <h2 className="header__heading">Recent Workflows</h2>
          <Button onClick={() => setShowCreateModal(true)} appearance="primary">
            Create New
          </Button>
        </div>
        <div css={workflowsContainer}>
          {workflowsData.map((data) => (
            <WorkflowCard
              key={data.id}
              id={data.id}
              title={data.title}
              type={data.type}
              description={data.description}
            />
          ))}
        </div>
        <WorkflowModal
          isShown={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      </div>
    </Container>
  );
};

export default Workflows;
