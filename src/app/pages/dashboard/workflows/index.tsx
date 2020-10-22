/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { Button } from 'evergreen-ui';
import { FunctionComponent } from 'react';
import Container from '../container';

const workflowStyles = css`
  margin-top: 20px;
  width: 100%;
`;

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  .header__heading {
    font-size: 20px;
    font-weight: 400;
  }
`;

interface WorkflowsProps {}

const Workflows: FunctionComponent<WorkflowsProps> = () => {
  return (
    <Container>
      <div css={workflowStyles}>
        <div css={headerStyles}>
          <h2 className="header__heading">Recent Workflows</h2>
          <Button appearance="primary">Create New</Button>
        </div>
      </div>
    </Container>
  );
};

export default Workflows;
