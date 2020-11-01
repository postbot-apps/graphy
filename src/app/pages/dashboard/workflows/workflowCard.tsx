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
import { Card, DiagramTreeIcon, FormIcon, HelpIcon } from 'evergreen-ui';
import { FunctionComponent, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

const workflowTypeMap: Record<string, ReactNode> = {
  Survey: <FormIcon size={24} />,
  FAQ: <HelpIcon size={24} />,
  Diagram: <DiagramTreeIcon size={24} />,
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
  id: string;
  title: string;
  type: string;
  description: string;
}

const WorkflowCard: FunctionComponent<WorkflowCardProps> = ({
  id,
  title,
  type,
  description,
}: WorkflowCardProps) => {
  const history = useHistory();

  return (
    <Card
      onClick={() => history.push(`/workflow/${id}`)}
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
