/**@jsx jsx */
import { useMutation, useQuery } from '@apollo/client';
import { css, jsx } from '@emotion/core';
import { FunctionComponent, useEffect, useState } from 'react';
import { Loading } from '../../shared/components/loading';
import { Navbar } from '../../shared/components/navbar';
import { GET_WORKFLOW, UPDATE_WORKFLOW } from './query';
import ActionBar from './actionbar';
import ReactFlowy from './react-flow';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { cloneDeep } from 'lodash';

interface EditorProps {
  match: {
    params: {
      id: string;
    };
  };
}

const editorStyles = css`
  display: flex;
  .editor__main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAH0lEQVQoU2NkYGD4z8DAwMhAABBUANM/qhBvSBIdPACgdAELiyknowAAAABJRU5ErkJggg==)
      repeat;
    width: 100%;
  }
`;

const Editor: FunctionComponent<EditorProps> = ({ match }: EditorProps) => {
  const [workflow, setWorkflow] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [updateWorkflow] = useMutation(UPDATE_WORKFLOW);

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
      setWorkflow(updatedData.getWorkflow);
      setBlocks(updatedData.getWorkflow.nodes);
    }
  };

  useEffect(() => {
    getWorkflow();
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  if (!workflow) {
    return <div>nothing here</div>;
  }

  const onSave = () => {
    updateWorkflow({
      variables: {
        id: id,
        workflow: blocks,
      },
      refetchQueries: [
        {
          query: GET_WORKFLOW,
          variables: {
            id,
          },
        },
      ],
    });
  };

  return (
    <div>
      <Navbar
        title={workflow.title}
        description={workflow.description}
        onSave={onSave}
        onDiscard={() => {}}
      />
      <div css={editorStyles}>
        <DndProvider backend={HTML5Backend}>
          <ActionBar />
          <ReactFlowy blocks={blocks} setBlocks={setBlocks} />
        </DndProvider>
      </div>
    </div>
  );
};

export default Editor;
