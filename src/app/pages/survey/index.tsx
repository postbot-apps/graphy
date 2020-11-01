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
import { useQuery } from '@apollo/client';
import { cloneDeep } from '@apollo/client/utilities';
import { jsx } from '@emotion/core';
import { Pane, Text } from 'evergreen-ui';
import { FunctionComponent, useEffect, useState } from 'react';
import { Loading } from '../../shared/components/loading';
import { NotFoundPage } from '../../shared/components/notfound';
import { Block } from '../editor/flow/types';
import { GET_WORKFLOW } from './query';
import Survey from './survey';

interface SurveyPageProps {}

interface SurveyPageProps {
  match: {
    params: {
      id: string;
    };
  };
}

const SurveyPage: FunctionComponent<SurveyPageProps> = ({
  match,
}: SurveyPageProps) => {
  const [workflow, setWorkflow] = useState([]);
  const [workflowType, setWorkflowType] = useState(null);

  const id = match.params.id;

  const { loading, error, data } = useQuery(GET_WORKFLOW, {
    variables: {
      id,
    },
  });

  const getWorkflow = () => {
    if (loading) {
      return null;
    }
    if (error) {
      console.log(error);
      console.error(`GET_WORKFLOW error: ${error}`);
      return `Error: ${error.message}`;
    }
    if (data && data.getWorkflow) {
      const updatedData = cloneDeep(data);
      updatedData.getWorkflow.nodes = updatedData.getWorkflow.nodes.map(
        (d: Block) => {
          const temp = d['blockId'];
          d['blockId'] = d['id'];
          d['id'] = temp;
          return d;
        }
      );
      setWorkflowType(updatedData.getWorkflow.type);
      setWorkflow(updatedData.getWorkflow.nodes);
    }
  };

  useEffect(() => {
    getWorkflow();
  }, [data]);
  if (loading) {
    return <Loading />;
  }

  if (workflowType && workflowType !== 'Survey') {
    return <NotFoundPage />;
  }

  if (workflow.length <= 0) {
    return (
      <Pane
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text size={600}>Empty Workflow</Text>
      </Pane>
    );
  }
  return <Survey id={id} workflow={workflow} />;
};

export default SurveyPage;
