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
import { cloneDeep } from '@apollo/client/utilities';
import { css, jsx } from '@emotion/core';
import { sortBy } from 'lodash';
import { FunctionComponent, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Loading } from '../../shared/components/loading';
import { ReactFlowy } from '../editor/flow';
import { Block, Position } from '../editor/flow/types';
import { GET_WORKFLOW } from './query';
import { Text } from 'evergreen-ui';
import { NotFoundPage } from '../../shared/components/notfound';

interface PreviewPageProps {}

interface PreviewPageProps {
  match: {
    params: {
      id: string;
    };
  };
}

const editorStyles = css`
  position: relative;
  height: 100vh;
  display: flex;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAH0lEQVQoU2NkYGD4z8DAwMhAABBUANM/qhBvSBIdPACgdAELiyknowAAAABJRU5ErkJggg==)
    repeat;
  .editor__main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;

const previewMode = css`
  position: absolute;
  right: 50px;
  top: 32px;
  background: #00000026;
  padding: 20px 40px;
`;

const PreviewPage: FunctionComponent<PreviewPageProps> = ({
  match,
}: PreviewPageProps) => {
  const [workflow, setWorkflow] = useState([]);
  const [firstBlockPos, setFirstBlockPos] = useState<Position>();
  const [workflowType, setWorkflowType] = useState(null);

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
      setWorkflow(updatedData.getWorkflow.nodes);
      setWorkflowType(updatedData.getWorkflow.type);
      setFirstBlockPos(updatedData.getWorkflow.firstBlockPosition);
    }
  };

  useEffect(() => {
    getWorkflow();
  }, [data]);
  if (loading) {
    return <Loading />;
  }

  if (workflowType && workflowType !== 'Diagram') {
    return <NotFoundPage />;
  }

  return (
    <div css={editorStyles}>
      <div css={previewMode}>
        <Text size={600}>PREVIEW MODE</Text>
      </div>
      <DndProvider backend={HTML5Backend}>
        <ReactFlowy
          blocks={sortBy(workflow, ['parent', 'id'])}
          firstBlockPos={firstBlockPos}
          setBlocks={setWorkflow}
          setFirstBlockPos={setFirstBlockPos}
        />
      </DndProvider>
    </div>
  );
};

export default PreviewPage;
