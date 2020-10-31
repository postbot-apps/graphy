/**@jsx jsx */
import { useMutation, useQuery } from '@apollo/client';
import { css, jsx } from '@emotion/core';
import { FunctionComponent, useEffect, useState } from 'react';
import { Loading } from '../../shared/components/loading';
import { Navbar } from '../../shared/components/navbar';
import { GET_WORKFLOW, UPDATE_WORKFLOW, UPDATE_WORKFLOW_CLEAR } from './query';
import ActionBar from './actionbar';
import ReactFlowy from './flow';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { cloneDeep, sortBy } from 'lodash';
import { Block, Position } from './flow/types';
import { toaster } from 'evergreen-ui';

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
  const [updateWorkflow] = useMutation(UPDATE_WORKFLOW, {
    onCompleted: () => {
      toaster.success('Workflow saved successfully', {
        duration: 2,
      });
    },
  });
  const [updateClearWorkflow] = useMutation(UPDATE_WORKFLOW_CLEAR);

  //@ts-ignore
  const [firstBlockPos, setFirstBlockPos] = useState<Position>({});

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
      setWorkflow(updatedData.getWorkflow);
      setBlocks(updatedData.getWorkflow.nodes);
      setFirstBlockPos(updatedData.getWorkflow.firstBlockPosition);
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

  const onSave = async () => {
    const removableBlocks = workflow.nodes.map((block: Block) => {
      // eslint-disable-next-line no-unused-vars
      const { __typename, ...rest } = block;
      const temp = rest['blockId'];
      rest['blockId'] = rest['id'];
      rest['id'] = temp;
      return rest;
    });

    const updatedBlocks = blocks.map((block) => {
      // eslint-disable-next-line no-unused-vars
      const { __typename, id, ...rest } = block;
      rest['blockId'] = id;
      return rest;
    });

    const updatedFirstBlockPos = firstBlockPos;
    delete updatedFirstBlockPos.__typename;

    const removeNodes = {
      nodes: removableBlocks,
    };

    await updateClearWorkflow({
      variables: {
        id: id,
        removenodes: removeNodes,
      },
    });
    await updateWorkflow({
      variables: {
        id: id,
        updatedNodes: updatedBlocks,
        firstBlockPos: updatedFirstBlockPos,
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

  const onDiscard = () => {
    setBlocks(workflow.nodes);
    setFirstBlockPos(workflow.firstBlockPosition);
    toaster.success('Workflow discarded', {
      duration: 2,
    });
  };

  const onClear = async () => {
    const removableBlocks = workflow.nodes.map((block: Block) => {
      // eslint-disable-next-line no-unused-vars
      const { __typename, ...rest } = block;
      const temp = rest['blockId'];
      rest['blockId'] = rest['id'];
      rest['id'] = temp;
      return rest;
    });
    const removeNodes = {
      nodes: removableBlocks,
    };
    await updateClearWorkflow({
      variables: {
        id: id,
        removenodes: removeNodes,
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

  console.log(blocks);

  return (
    <div>
      <Navbar
        title={workflow.title}
        description={workflow.description}
        onSave={onSave}
        onDiscard={onDiscard}
        onClear={onClear}
        id={id}
        type={workflow.type}
      />
      <div css={editorStyles}>
        <DndProvider backend={HTML5Backend}>
          <ActionBar />
          <ReactFlowy
            blocks={sortBy(blocks, ['parent', 'id'])}
            setBlocks={setBlocks}
            firstBlockPos={firstBlockPos}
            setFirstBlockPos={setFirstBlockPos}
          />
        </DndProvider>
      </div>
    </div>
  );
};

export default Editor;
