/**@jsx jsx */
import { useQuery } from '@apollo/client';
import { css, jsx } from '@emotion/core';
import { FunctionComponent, useEffect, useState } from 'react';
import { Loading } from '../../shared/components/loading';
import { Navbar } from '../../shared/components/navbar';
import { GET_WORKFLOW } from './query';
import ActionBar from './actionbar';

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
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAH0lEQVQoU2NkYGD4z8DAwMhAABBUANM/qhBvSBIdPACgdAELiyknowAAAABJRU5ErkJggg==)
      repeat;
    width: 100%;
  }
`;

const Editor: FunctionComponent<EditorProps> = ({ match }: EditorProps) => {
  const [workflow, setWorkflow] = useState(null);

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
      console.error(`GET_WORKFLOW error: ${error}`);
      return `Error: ${error.message}`;
    }
    if (data && data.getWorkflow) {
      setWorkflow(data.getWorkflow);
    }
    console.log(data);
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

  return (
    <div>
      <Navbar
        title={workflow.title}
        description={workflow.description}
        onSave={() => {}}
        onDiscard={() => {}}
      />
      <div css={editorStyles}>
        <ActionBar />
        <div className="editor__main"></div>
      </div>
    </div>
  );
};

export default Editor;
