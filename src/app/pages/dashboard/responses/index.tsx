/**@jsx jsx */
import { jsx } from '@emotion/core';
import { Heading, Pane } from 'evergreen-ui';
import { FunctionComponent } from 'react';
import Container from '../container';
import Responses from './responses';
import { WorkflowItem } from './types';

interface ResponsesPageProps {}

const sampleWorkflow: WorkflowItem[] = [
  {
    id: 0,
    text: 'Thanks for taking time to do our Responses',
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

const responses = [
  {
    workflow: 'myworkflow',
    id: 1,
    data: [
      {
        id: 0,
        option: {
          text: 'Start',
          id: 1,
        },
      },
      {
        id: 2,
        option: {
          text: 'Developer',
          id: 3,
        },
      },
      {
        id: 6,
        option: 'email@gmail.com',
      },
    ],
  },
];

const ResponsesPage: FunctionComponent<ResponsesPageProps> = () => {
  return (
    <Container>
      <Pane width="100%">
        <Heading size={800} marginTop="default">
          Responses
        </Heading>
        <Responses workflow={sampleWorkflow} responses={responses} />
      </Pane>
    </Container>
  );
};

export default ResponsesPage;
