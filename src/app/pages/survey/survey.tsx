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
import { Heading, Pane, Text } from 'evergreen-ui';
import { FunctionComponent, useEffect, useState } from 'react';
import { WorkflowItem } from './types';
import getOptionsTemplate from './templates';
import { useMutation } from '@apollo/client';
import { ADD_RESPONSE, UPDATE_RESPONSE } from './query';
import { Loading } from '../../shared/components/loading';

interface SurveyProps {
  id: String;
  workflow: WorkflowItem[];
}

const computeOptions = (workflow: any, selectedBlock: any) => {
  const children = workflow.filter((w: any) => w.parent === selectedBlock.id);
  return {
    ...selectedBlock,
    options: children.map((w: any) => ({
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
    return <Loading />;
  }

  const block = computeOptions(workflow, selectedBlock);

  const saveResponse = async (newResp: any) => {
    if (!respId) {
      const { data } = await addResponse({
        variables: {
          response: [
            {
              workflow: { id },
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
