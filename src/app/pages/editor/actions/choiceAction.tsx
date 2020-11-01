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

const cardStyles = (showSideSheet: boolean) => css`
  display: inline-block;
  background-color: #fff;
  box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.05);
  border: ${showSideSheet ? '2px solid #1070CA' : '2px solid white'};
  width: 100%;
  height: 100%;
  .card__content {
    padding: 10px;
  }
`;

interface ChoiceActionProps {
  choiceData?: string;
}

const ChoiceAction: FunctionComponent<ChoiceActionProps> = ({
  choiceData = 'Your choice',
}) => {
  const [choice, setChoice] = useState(choiceData);
  const [showSideSheet, setShowSideSheet] = useState(false);

  return (
    <Card css={cardStyles(showSideSheet)} onClick={() => setShowSideSheet(true)}>
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
              label="Your choice"
              value={choice}
              onChange={(e: any) => {
                setChoice(e.target.value);
              }}
            />
          </Pane>
        </Pane>
      </SideSheet>
      <div>
        <div>{choice}</div>
      </div>
    </Card>
  );
};

export default ChoiceAction;
