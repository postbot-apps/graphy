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
import { jsx } from '@emotion/core';
import { Dialog, SelectField, TextInputField } from 'evergreen-ui';
import { FunctionComponent, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_WORKFLOW } from './query';
import { useAuth0 } from '@auth0/auth0-react';

interface WorkflowModalProps {
  isShown: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  setRedirect: (workflowId: string) => void;
}

interface WorkflowType {
  name: string;
  wip?: boolean;
}

export const workflowTypes: Record<string, WorkflowType> = {
  survey: {
    name: 'Survey',
  },
  diagram: {
    name: 'Diagram',
  },
  faq: {
    name: 'FAQ',
    wip: true,
  },
  chat: {
    name: 'Chat',
    wip: true,
  },
};

const WorkflowModal: FunctionComponent<WorkflowModalProps> = ({
  isShown,
  onClose,
  setRedirect,
}: WorkflowModalProps) => {
  const [workflowName, setWorkflowName] = useState(null);
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [workflowType, setWorkflowType] = useState(workflowTypes.survey.name);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);

  const { user } = useAuth0();

  const [addWorkflow] = useMutation(ADD_WORKFLOW, {
    onCompleted: (data: any) => {
      setRedirect(data.addWorkflow.workflow[0].id);
    },
  });

  const onConfirm = () => {
    if (workflowName) {
      setIsConfirmLoading(true);
      addWorkflow({
        variables: {
          workflow: [
            {
              title: workflowName,
              type: workflowType,
              description: workflowDescription,
              creator: { email: user.email },
            },
          ],
        },
      });
    }
  };

  return (
    <Dialog
      isShown={isShown}
      title="Create a Workflow"
      onCloseComplete={onClose}
      onConfirm={onConfirm}
      isConfirmLoading={isConfirmLoading}
      confirmLabel="Create Workflow"
    >
      <TextInputField
        required
        onChange={(e: any) => setWorkflowName(e.target.value)}
        label="Add a title for your workflow"
        placeholder="title"
        validationMessage={!workflowName && 'This field is required'}
      />
      <SelectField
        label="Specify type for your workflow"
        defaultValue={workflowType}
        width="100%"
        onChange={(event) => setWorkflowType(event.target.value)}
      >
        {Object.values(workflowTypes).map((type) => (
          <option key={type.name} disabled={type.wip} value={type.name}>
            {!type.wip ? type.name : `${type.name} - Coming Soon`}
          </option>
        ))}
      </SelectField>
      <TextInputField
        onChange={(e: any) => setWorkflowDescription(e.target.value)}
        label="Add a description for your workflow"
        placeholder="description"
      />
    </Dialog>
  );
};

export default WorkflowModal;
