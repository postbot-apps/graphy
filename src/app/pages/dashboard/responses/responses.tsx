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
import { Table } from 'evergreen-ui';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

const parseDate = (date: Date) => {
  return date.toLocaleString();
};

const ResponsesPage: FunctionComponent<any> = ({ responses }: any) => {
  const history = useHistory();
  return (
    <Table width="100%" marginTop={30}>
      <Table.Head>
        <Table.TextHeaderCell>id</Table.TextHeaderCell>
        <Table.TextHeaderCell>Workflow</Table.TextHeaderCell>
        <Table.TextHeaderCell>date</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body height={240}>
        {responses.map((response: any) => (
          <Table.Row
            key={response.id}
            isSelectable
            onSelect={() => history.push(`/response/${response.id}`)}
          >
            <Table.TextCell>{response.id}</Table.TextCell>
            <Table.TextCell>{response.workflow.title}</Table.TextCell>
            <Table.TextCell>{parseDate(new Date(response.date))}</Table.TextCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default ResponsesPage;
