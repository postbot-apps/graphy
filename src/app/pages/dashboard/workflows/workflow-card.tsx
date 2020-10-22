/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { Card, ChatIcon, DatabaseIcon, DiagramTreeIcon } from 'evergreen-ui';
import { FunctionComponent, ReactNode } from 'react';

const workflowTypeMap: Record<string, ReactNode> = {
  database: <DatabaseIcon size={24} />,
  chat: <ChatIcon size={24} />,
  diagram: <DiagramTreeIcon size={24} />,
};

const workflowContent = css`
  /* background: #fff; */
  height: 100%;
  padding: 0 20px;
  padding-bottom: 20px;
  .workflow__title {
    font-size: 16px;
    font-weight: 400;
  }
  .workflow__description {
    font-size: 14px;
    font-weight: 300;
  }
`;

const iconHolderStyles = css`
  padding-left: 20px;
  padding-top: 25px;
  padding-bottom: 10px;
`;

interface WorkflowCardProps {
  title: string;
  type: string;
  description: string;
}

const WorkflowCard: FunctionComponent<WorkflowCardProps> = ({
  title,
  type,
  description,
}: WorkflowCardProps) => {
  return (
    <Card
      display="flex"
      flexDirection="column"
      minHeight={120}
      elevation={1}
      hoverElevation={2}
      border="default"
      cursor="pointer"
      background="linear-gradient(rgb(244, 245, 247) 33%, transparent 33%);"
    >
      <div css={iconHolderStyles}>{workflowTypeMap[type]}</div>
      <div css={workflowContent}>
        <h4 className="workflow__title">{title}</h4>
        <p className="workflow__description">{description}</p>
      </div>
    </Card>
  );
};

export default WorkflowCard;
