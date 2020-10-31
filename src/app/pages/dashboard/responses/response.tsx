/**@jsx jsx */
import { useQuery } from '@apollo/client';
import { jsx } from '@emotion/core';
import { Heading, Pane, Table } from 'evergreen-ui';
import React from 'react';
import { FunctionComponent } from 'react';
import { Loading } from '../../../shared/components/loading';
import Container from '../container';
import { GET_RESPONSE } from './query';

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

  const nodes = data.getResponse.workflow.nodes;

  return (
    <Container>
      <Pane width="100%">
        <Heading size={800} marginTop="default">
          Response
        </Heading>
        <Pane width="100%" marginTop={30}>
          {response.map((r: any) => {
            const block = nodes.find((b: any) => r.id === b.blockId);
            console.log('r', r, block);
            return (
              <React.Fragment key={r.id}>
                <Table.Row background="#EDF0F2">
                  <Table.TextCell>Q: {block.title}</Table.TextCell>
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
