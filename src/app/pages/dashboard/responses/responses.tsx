/**@jsx jsx */
import { jsx } from '@emotion/core';
import { Pane, Table } from 'evergreen-ui';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

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
            <Table.TextCell>29/10/2020</Table.TextCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default ResponsesPage;
