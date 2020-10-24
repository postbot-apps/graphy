/**@jsx jsx */
import { jsx } from '@emotion/core';
import { Dialog, SelectField, TextInputField } from 'evergreen-ui';
import { FunctionComponent, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_WORKFLOW, GET_WORKFLOWS } from './query';
import { useAuth0 } from '@auth0/auth0-react';

interface WorkflowModalProps {
  isShown: boolean;
  onClose: () => void;
}

const workflowTypes: Record<string, string> = {
  default: 'Default',
  database: 'Database',
  chat: 'Chat',
  diagram: 'Diagram',
};

const WorkflowModal: FunctionComponent<WorkflowModalProps> = ({
  isShown,
  onClose,
}: WorkflowModalProps) => {
  const [workflowName, setWorkflowName] = useState(null);
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [workflowType, setWorkflowType] = useState(workflowTypes.default);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);

  const { user } = useAuth0();

  const [addWorkflow] = useMutation(ADD_WORKFLOW, {
    onCompleted: () => {
      setIsConfirmLoading(false);
      onClose();
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
        refetchQueries: [
          {
            query: GET_WORKFLOWS,
            variables: {
              email: user.email,
            },
          },
        ],
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
          <option key={type} value={type}>
            {type}
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
