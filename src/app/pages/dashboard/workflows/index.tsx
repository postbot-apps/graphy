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
import { css, jsx } from '@emotion/core';
import { Button } from 'evergreen-ui';
import { FunctionComponent, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Loading } from '../../../shared/components/loading';
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

export const newButtonStyles = css`
  background: #09143e;
  color: #fff;
  transition: 0.5s ease;
  &:hover {
    background: #0a1233 !important;
    transition: 0.5s ease;
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
  const [redirect, setRedirect] = useState(null);
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
  if (redirect) {
    return <Redirect to={`/workflow/${redirect}`} />;
  }

  return (
    <Container>
      <div css={workflowStyles}>
        <div css={headerStyles}>
          <h2 className="header__heading">Recent Workflows</h2>
          <Button
            css={newButtonStyles}
            onClick={() => setShowCreateModal(true)}
            appearance="primary"
          >
            Create New
          </Button>
        </div>
        {loading && <Loading />}
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
          setRedirect={(id: string) => setRedirect(id)}
          isShown={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      </div>
    </Container>
  );
};

export default Workflows;
