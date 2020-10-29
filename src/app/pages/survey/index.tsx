/**@jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';
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

const SurveyPage: FunctionComponent<SurveyPageProps> = () => {
  return <Survey workflow={sampleWorkflow} />;
};

export default SurveyPage;
