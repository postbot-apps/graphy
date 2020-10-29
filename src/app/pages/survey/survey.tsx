/**@jsx jsx */
import { jsx } from '@emotion/core';
import { Button, Heading, Pane, Text, Spinner } from 'evergreen-ui';
import { FunctionComponent, useEffect, useState } from 'react';
import { WorkflowItem } from './types';
import getOptionsTemplate from './templates';

interface SurveyProps {
  workflow: WorkflowItem[];
}

const computeOptions = (workflow, selectedBlock) => {
  const children = workflow.filter((w) => w.parent === selectedBlock.id);
  return {
    ...selectedBlock,
    options: children.map((w) => ({
      text: w.text,
      id: w.id,
    })),
  };
};

const Survey: FunctionComponent<SurveyProps> = ({ workflow }: SurveyProps) => {
  const [selectedBlock, setSelectedBlock] = useState<WorkflowItem>(null);
  const [response, setResponse] = useState([]);
  useEffect(() => {
    if (!selectedBlock) {
      setSelectedBlock(workflow.find((w) => w.parent === -1));
    }
  }, []);

  const selectOption = (option: any) => {
    const nextBlock = workflow.find((w) => option.id === w.parent);
    setResponse([...response, { id: selectedBlock.id, option: option.text }]);
    setSelectedBlock(nextBlock);
  };

  const saveInput = (option: any) => {
    const nextBlock = workflow.find((w) => selectedBlock.id === w.parent);
    console.log(selectedBlock.id)
    setResponse([...response, { id: selectedBlock.id, option }]);
    setSelectedBlock(nextBlock);
  };

  if (!selectedBlock) {
    return <Spinner />;
  }

  const block = computeOptions(workflow, selectedBlock);
  console.log(response);
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
        {block.text}
      </Heading>
      <Text size={400} marginTop={10}>
        {block.subText}
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
