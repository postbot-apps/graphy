/**@jsx jsx */
import { jsx } from '@emotion/core';
import { Pane, Table } from 'evergreen-ui';
import React from 'react';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

const workflow = [
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

const response = [
  {
    id: 0,
    option: 'Start',
  },
  {
    id: 2,
    option: 'Developer',
  },
  {
    id: 6,
    option: 'email@gmail.com',
  },
];

const ResponsesPage: FunctionComponent<any> = () => {
  return (
    <Pane>
      {response.map((r) => {
        const block = workflow.find((b) => r.id === b.id);
        return (
          <React.Fragment key={r.id}>
            <Table.Row background="#EDF0F2">
              <Table.TextCell>Q: {block.text}</Table.TextCell>
            </Table.Row>
            <Table.Row>
              <Table.TextCell>A: {r.option}</Table.TextCell>
            </Table.Row>
          </React.Fragment>
        );
      })}
    </Pane>
  );
};

export default ResponsesPage;
