/**@jsx jsx */
import { useQuery } from '@apollo/client';
import { css, jsx } from '@emotion/core';
import { FunctionComponent, useEffect, useState } from 'react';
import { Loading } from '../../shared/components/loading';
import { Navbar } from '../../shared/components/navbar';
import { GET_WORKFLOW } from './query';
import ActionBar from './actionbar';
// import QuestionAction from './actions/questionAction';
// import ChoiceAction from './actions/choiceAction';
// import SolutionAction from './actions/solutionAction';
// import Canvas from './react-flow/canvas';
import ReactFlowy from './react-flow';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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

// const sampleWorkflow = {
//   id: 1,
//   type: 'survey',
//   nodes: [
//     {
//       type: 'question',
//       title: 'My question Example',
//       description: 'My question description',
//       nodes: [
//         {
//           type: 'choice 1',
//           title: 'My choice 1',
//           nodes: [
//             {
//               type: 'solution',
//               title: 'My solution 1',
//             },
//           ],
//         },
//         {
//           type: 'choice',
//           title: 'My choice 2',
//           nodes: [
//             {
//               type: 'solution',
//               title: 'My solution 2',
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

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
        <DndProvider backend={HTML5Backend}>
          <ActionBar />
          <ReactFlowy />
        </DndProvider>
      </div>
    </div>
  );
};

export default Editor;
