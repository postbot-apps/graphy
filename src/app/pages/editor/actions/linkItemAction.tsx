/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import {
  Card,
  Heading,
  Pane,
  Paragraph,
  SideSheet,
  TextInputField,
  Text,
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
  buttonText?: string;
  link?: string;
  // eslint-disable-next-line no-unused-vars
  setBlockContent: (type: string, value: string) => void;
}

const TaskAction: FunctionComponent<TaskActionProps> = ({
  type,
  title,
  description,
  buttonText,
  link,
  setBlockContent,
}: TaskActionProps) => {
  const [showSideSheet, setShowSideSheet] = useState(false);
  return (
    <Card css={cardStyles} onClick={() => setShowSideSheet(true)}>
      <BlockHead type={type} />
      <div className="card__content">
        <Heading
          size={400}
          width="100%"
          display="block"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          {title || 'No Title'}
        </Heading>
        <Text
          size={300}
          width="100%"
          display="block"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          {description || 'No Description'}
        </Text>
      </div>
      <SideSheet
        isShown={showSideSheet}
        onCloseComplete={() => setShowSideSheet(false)}
      >
        <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
          <Pane padding={16} borderBottom="muted">
            <Heading size={600}>Input Action</Heading>
            <Paragraph size={400} color="muted">
              Enter the details for input action
            </Paragraph>
          </Pane>
          <Pane padding={16}>
            <TextInputField
              label="Title"
              value={title}
              onChange={(e: any) => {
                setBlockContent('title', e.target.value);
              }}
            />
            <TextInputField
              label="Description"
              value={description}
              onChange={(e: any) => {
                setBlockContent('description', e.target.value);
              }}
            />
            <TextInputField
              label="Button Text"
              value={buttonText}
              onChange={(e: any) => {
                setBlockContent('buttonText', e.target.value);
              }}
            />
            <TextInputField
              label="Link"
              value={link}
              onChange={(e: any) => {
                setBlockContent('link', e.target.value);
              }}
            />
          </Pane>
        </Pane>
      </SideSheet>
    </Card>
  );
};

export default TaskAction;
