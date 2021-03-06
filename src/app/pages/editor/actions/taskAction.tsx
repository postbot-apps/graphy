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
  const [showSideSheet, setShowSideSheet] = useState(false);
  return (
    <Card css={cardStyles(showSideSheet)} onClick={() => setShowSideSheet(true)}>
      <BlockHead type={type} />
      <div className="card__content">
        <div>{title}</div>
        <div>{description}</div>
      </div>
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
          </Pane>
        </Pane>
      </SideSheet>
    </Card>
  );
};

export default TaskAction;
