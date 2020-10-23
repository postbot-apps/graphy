/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { Button } from 'evergreen-ui';
import { FunctionComponent } from 'react';
import Container from '../container';
import WorkflowCard from './workflow-card';

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

const sampleData = [
  {
    id: 1,
    title: 'Mongo DB',
    type: 'database',
    description: 'Mongo db flow',
  },
  {
    id: 2,
    title: 'Chat bot',
    type: 'chat',
    description: 'chat bot flow',
  },
  {
    id: 3,
    title: 'Diagram',
    type: 'diagram',
    description: 'Diagram flow',
  },
  {
    id: 4,
    title: 'Mysql DB',
    type: 'database',
    description: 'Mysql db flow',
  },
  {
    id: 5,
    title: 'Facebook bot',
    type: 'chat',
    description: 'facebook bot flow',
  },
];

const Workflows: FunctionComponent<WorkflowsProps> = () => {
  return (
    <Container>
      <div css={workflowStyles}>
        <div css={headerStyles}>
          <h2 className="header__heading">Recent Workflows</h2>
          <Button appearance="primary">Create New</Button>
        </div>
        <div css={workflowsContainer}>
          {sampleData.map((data) => (
            <WorkflowCard
              key={data.id}
              title={data.title}
              type={data.type}
              description={data.description}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Workflows;
