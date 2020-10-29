/**@jsx jsx */
import { jsx } from '@emotion/core';
import { Button, Heading, Pane, Text, Spinner } from 'evergreen-ui';
import { FunctionComponent, useEffect, useState } from 'react';
import { WorkflowItem } from './types';
import getOptionsTemplate from './templates';
import { useMutation } from '@apollo/client';
import { ADD_RESPONSE, UPDATE_RESPONSE } from './query';

interface SurveyProps {
  id: String;
  workflow: WorkflowItem[];
}

const computeOptions = (workflow, selectedBlock) => {
  const children = workflow.filter((w) => w.parent === selectedBlock.id);
  return {
    ...selectedBlock,
    options: children.map((w) => ({
      // title: w.title,
      // description: w.description,
      option: w.option,
      id: w.id,
    })),
  };
};

const Survey: FunctionComponent<SurveyProps> = ({ id, workflow }: SurveyProps) => {
  const [selectedBlock, setSelectedBlock] = useState<WorkflowItem>(null);
  const [response, setResponse] = useState([]);
  const [respId, setRespId] = useState(null);

  const [addResponse] = useMutation(ADD_RESPONSE);
  const [updateResponse] = useMutation(UPDATE_RESPONSE);

  useEffect(() => {
    if (!selectedBlock) {
      setSelectedBlock(workflow.find((w) => w.parent === -1));
    }
  }, []);

  const selectOption = (option: any) => {
    const nextBlock = workflow.find((w) => option.id === w.parent);
    setResponse([...response, { id: selectedBlock.id, option: option.option }]);
    saveResponse({ id: selectedBlock.id, option: option.option });
    setSelectedBlock(nextBlock);
  };

  const saveInput = (option: any) => {
    const nextBlock = workflow.find((w) => selectedBlock.id === w.parent);
    setResponse([...response, { id: selectedBlock.id, option }]);
    saveResponse({ id: selectedBlock.id, option });
    setSelectedBlock(nextBlock);
  };

  if (!selectedBlock) {
    return <Spinner />;
  }

  const block = computeOptions(workflow, selectedBlock);

  const saveResponse = async (newResp: any) => {
    if (!respId) {
      const { data } = await addResponse({
        variables: {
          response: [
            {
              workflowId: id,
              date: new Date().toISOString(),
              data: [newResp],
            },
          ],
        },
      });
      setRespId(data.addResponse.response[0].id);
    } else {
      await updateResponse({
        variables: {
          id: respId,
          updatedData: [newResp],
        },
      });
    }
  };

  return (
    <Pane
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      border="none"
      flexDirection="column"
    >
      <Heading size={800} marginTop="default">
        {block.title}
      </Heading>
      <Text size={400} marginTop={10}>
        {block.description}
      </Text>
      {getOptionsTemplate({ block, selectOption, saveInput })}
      {/* <Pane marginTop={20}>
        {block.options.map((option) => (
          <Button
            key={option.id}
            marginRight={16}
            onClick={() => {
              selectOption(option);
            }}
          >
            {option.text}
          </Button>
        ))}
      </Pane> */}
    </Pane>
  );
};

export default Survey;
