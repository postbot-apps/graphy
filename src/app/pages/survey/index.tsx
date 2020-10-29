/**@jsx jsx */
import { useQuery } from '@apollo/client';
import { cloneDeep } from '@apollo/client/utilities';
import { jsx } from '@emotion/core';
import { FunctionComponent, useEffect, useState } from 'react';
import { Loading } from '../../shared/components/loading';
import { Block } from '../editor/react-flow/types';
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
