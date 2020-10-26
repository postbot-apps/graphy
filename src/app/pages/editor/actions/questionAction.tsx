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

const cardStyles = css`
  display: inline-block;
  padding: 10px 20px;
  background-color: #fff;
  margin-top: 20px;
  box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.05);
`;

interface QuestionActionProps {
  questionData?: string;
  descriptionData?: string;
}

const QuestionAction: FunctionComponent<QuestionActionProps> = ({
  questionData = 'Your Question',
  descriptionData = 'Your Description',
}) => {
  const [question, setQuestion] = useState(questionData);
  const [description, setDescription] = useState(descriptionData);
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
              label="Your question"
              value={question}
              onChange={(e: any) => {
                setQuestion(e.target.value);
              }}
            />
            <TextInputField
              label="Your description"
              value={description}
              onChange={(e: any) => {
                setDescription(e.target.value);
              }}
            />
          </Pane>
        </Pane>
      </SideSheet>
      <div>
        <div>{question}</div>
        <div>{description}</div>
      </div>
    </Card>
  );
};

export default QuestionAction;
