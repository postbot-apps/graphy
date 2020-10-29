/**@jsx jsx */
import { useQuery } from '@apollo/client';
import { cloneDeep } from '@apollo/client/utilities';
import { jsx } from '@emotion/core';
import { FunctionComponent, useEffect, useState } from 'react';
import { Loading } from '../../shared/components/loading';
import { Block } from '../editor/react-flow/types';
import { GET_WORKFLOW } from './query';
import Survey from './survey';
import { WorkflowItem } from './types';

interface SurveyPageProps {}

const sampleWorkflow: WorkflowItem[] = [
  {
    id: 0,
    text: 'Thanks for taking time to do our survey',
    type: 'options',
    parent: -1,
  },
  {
    id: 1,
    text: 'Start',
    type: 'options-trigger',
    parent: 0,
  },
  {
    id: 2,
    text: 'Select your profieciency',
    type: 'options',
    parent: 1,
  },
  {
    id: 3,
    text: 'Developer',
    type: 'options-trigger',
    parent: 2,
  },
  {
    id: 4,
    text: 'Teacher',
    type: 'options-trigger',
    parent: 2,
  },
  {
    id: 5,
    text: 'Student',
    type: 'options-trigger',
    parent: 2,
  },
  {
    id: 6,
    text: 'Provide your email',
    type: 'input',
    placeholder: 'Email',
    parent: 3,
  },
  {
    id: 7,
    text: 'Thanks',
    type: 'text',
    parent: 4,
  },
  {
    id: 8,
    text: 'Thanks',
    type: 'text',
    parent: 5,
  },
  {
    id: 9,
    text: 'Thanks',
    type: 'text',
    parent: 6,
  },
];

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
      setWorkflow(updatedData.getWorkflow.nodes);
    }
  };

  useEffect(() => {
    getWorkflow();
  }, [data]);
  if (workflow.length <= 0) {
    return <Loading />;
  }
  return <Survey id={id} workflow={workflow} />;
};

export default SurveyPage;
