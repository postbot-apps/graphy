/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import {
  Card,
  Heading,
  Pane,
  Paragraph,
  SideSheet,
  TextInputField,
} from 'evergreen-ui';
import { FunctionComponent, useState } from 'react';
import BlockHead from './blockHead';

const cardStyles = css`
  display: inline-block;
  background-color: #fff;
  box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.05);
  width: 100%;
  height: 100%;
  .card__content {
    padding: 10px;
  }
`;

interface TaskActionProps {
  type: string;
  title?: string;
  description?: string;
  // eslint-disable-next-line no-unused-vars
  setBlockContent: (type: string, value: string) => void;
}

const TaskAction: FunctionComponent<TaskActionProps> = ({
  type,
  title = 'Your task',
  description = 'Your Description',
  setBlockContent,
}: TaskActionProps) => {
  console.log(type);
  const [showSideSheet, setShowSideSheet] = useState(false);
  return (
    <Card css={cardStyles} onClick={() => setShowSideSheet(true)}>
      <SideSheet
        isShown={showSideSheet}
        onCloseComplete={() => setShowSideSheet(false)}
      >
        <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
          <Pane padding={16} borderBottom="muted">
            <Heading size={600}>Title</Heading>
            <Paragraph size={400} color="muted">
              Optional description or sub title
            </Paragraph>
          </Pane>
          <Pane padding={16}>
            <TextInputField
              label="Your task"
              value={title}
              onChange={(e: any) => {
                setBlockContent('title', e.target.value);
              }}
            />
            <TextInputField
              label="Your description"
              value={description}
              onChange={(e: any) => {
                setBlockContent('description', e.target.value);
              }}
            />
          </Pane>
        </Pane>
      </SideSheet>
      <BlockHead type={type} />
      <div className="card__content">
        <div>{title}</div>
        <div>{description}</div>
      </div>
    </Card>
  );
};

export default TaskAction;
