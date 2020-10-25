/**@jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useState } from 'react';
import Canvas from './canvas';
import DragBlock from './dragBlock';
import { Block } from './types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getAllChildrenBlocks } from './utils';

const flowyStyles = css`
  .template {
    width: 200px;
    height: 50px;
    text-align: center;
    background: white;
  }

  .dropzone {
    width: 200px;
    height: 50px;
    background: blueviolet;
    margin-bottom: 10px;
    padding: 10px;
  }

  #canvas {
    background: #e6e6e6;
    height: 800px;
    position: relative;
    overflow: scroll;
  }

  #canvas.highlight {
    background: #d2d2d2;
  }

  .blocks {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  .dragging {
    opacity: 0.5;
    box-shadow: none;
  }

  .block {
    position: absolute;
    opacity: 1;
    width: 200px;
    height: 50px;
    text-align: center;
    background: red;
  }

  .block .drag-area-container {
    position: relative;
  }

  .block .drag-area {
    position: absolute;
    top: 0;
    width: 100%;
    height: 200px;
  }

  .block.dragging .drag-area-container {
    visibility: hidden;
  }

  .block.show-indicator::after {
    position: absolute;
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    transform: translate(-50%, -50%);
    background: #0095ff;
    border-radius: 100%;
    top: 100%;
    left: 50%;
  }

  .arrow-block {
    position: absolute;
    pointer-events: none;
  }

  .arrow-block svg {
    overflow: visible;
  }
`;

export const ReactFlowy: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const addNewBlock = (block: Block) => {
    setBlocks([
      ...blocks,
      { ...block, id: Math.max(...blocks.map((b) => b.id)) + 1 },
    ]);
  };
  const addFirstBlock = (block: Block) => {
    setBlocks([block]);
  };
  const changeParent = (id: number, parent: number) => {
    const block = blocks.find((b) => b.id === id);
    const children = getAllChildrenBlocks(blocks, { id: block.id });
    const filterIds = [...children.map((c) => c.id), id];

    setBlocks([
      ...blocks.filter((b) => !filterIds.includes(b.id)),
      { ...block, parent },
      ...children,
    ]);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div css={flowyStyles}>
        <Canvas
          blocks={blocks}
          addNewBlock={addNewBlock}
          addFirstBlock={addFirstBlock}
          padding={{ x: 20, y: 40 }}
          changeParent={changeParent}
        />
        <div className="blocks">
          <DragBlock name="block-1" />
          <DragBlock name="block-2" />
          <DragBlock name="block-3" />
          <DragBlock name="block-4" />
        </div>
      </div>
    </DndProvider>
  );
};

export default ReactFlowy;
