/**@jsx jsx */
import { useQuery } from '@apollo/client';
import { jsx } from '@emotion/core';
import { Heading, Pane, Table } from 'evergreen-ui';
import React from 'react';
import { FunctionComponent } from 'react';
import { Loading } from '../../../shared/components/loading';
import Container from '../container';
import { GET_RESPONSE } from './query';

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

const ResponsesPage: FunctionComponent<any> = ({ match }: any) => {
  const id = match.params.id;

  const { loading, data } = useQuery(GET_RESPONSE, {
    variables: {
      id,
    },
  });

  if (loading) {
    return <Loading />;
  }
  const response = data.getResponse.data;

  return (
    <Container>
      <Pane width="100%">
        <Heading size={800} marginTop="default">
          Response
        </Heading>
        <Pane width="100%" marginTop={30}>
          {response.map((r: any) => {
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
      </Pane>
    </Container>
  );
};

export default ResponsesPage;
