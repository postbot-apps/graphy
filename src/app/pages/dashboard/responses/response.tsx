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
import { jsx } from '@emotion/core';
import { Heading, Pane, Table } from 'evergreen-ui';
import React from 'react';
import { FunctionComponent } from 'react';
import { Loading } from '../../../shared/components/loading';
import Container from '../container';
import { GET_RESPONSE } from './query';

const parseDate = (date: Date) => {
  return date.toLocaleString();
};

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
        <Pane>
          <Heading size={500} marginTop="default">
            Workflow: {data.getResponse.workflow.title}
          </Heading>
          <Heading size={500} marginTop="default">
            Date: {parseDate(data.getResponse.date)}
          </Heading>
          <Heading size={500} marginTop="default">
            Response Id: {data.getResponse.id}
          </Heading>
        </Pane>
        <Pane width="100%" marginTop={30}>
          {response.map((r: any) => {
            const block = nodes.find((b: any) => r.id === b.blockId);
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
