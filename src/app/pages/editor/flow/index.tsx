/**@jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Canvas from './canvas';
import { Block, Position } from './types';
import { getAllChildrenBlocks } from './utils';
import BlocksTemplates from './blocksTemplate';

const flowyStyles = css`
  width: 100%;
  .template {
    width: 200px;
    height: 50px;
    text-align: center;
    background: white;
  }

  /* .dropzone {
    width: 200px;
    height: 50px;
    background: blueviolet;
    margin-bottom: 10px;
    padding: 10px;
  } */

  #canvas {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAH0lEQVQoU2NkYGD4z8DAwMhAABBUANM/qhBvSBIdPACgdAELiyknowAAAABJRU5ErkJggg==);
    height: calc(100vh - 64px);
    width: 100%;
    position: relative;
    overflow: scroll;
  }

  #canvas.highlight {
    background: #d2d2d2;
  }

  .dragging {
    opacity: 0.5;
    box-shadow: none;
  }

  .block {
    position: absolute;
    opacity: 1;
    width: 300px;
    height: 120px;
    /*text-align: center;*/
    /* background: red; */
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

interface FlowyProps {
  blocks: Block[];
  setBlocks?: Dispatch<SetStateAction<Block[]>>;
  firstBlockPos: Position;
  setFirstBlockPos?: Dispatch<SetStateAction<Position>>;
}

export const ReactFlowy: React.FC<FlowyProps> = ({
  blocks,
  setBlocks,
  firstBlockPos,
  setFirstBlockPos,
}: FlowyProps) => {
  // const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<number>(-1);
  // @ts-ignore

  const addNewBlock = (block: Block) => {
    setBlocks([
      ...blocks,
      { ...block, id: Math.max(...blocks.map((b) => b.id)) + 1 },
    ]);
  };
  const addFirstBlock = (block: Block) => {
    setBlocks([block]);
  };
  const setFirstBlockPosition = (position: Position) => {
    setFirstBlockPos(position);
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

  const setBlockContent = (type: string, value: string) => {
    setBlocks(
      blocks.map((b) => {
        if (b.id === selectedBlock) {
          return { ...b, [type]: value };
        }
        return b;
      })
    );
  };

  return (
    <div css={flowyStyles}>
      <Canvas
        blocks={blocks}
        addNewBlock={addNewBlock}
        addFirstBlock={addFirstBlock}
        padding={{ x: 20, y: 80 }}
        changeParent={changeParent}
        templates={BlocksTemplates}
        //@ts-ignore
        setFirstBlockPosition={setFirstBlockPosition}
        //@ts-ignore
        firstBlockPos={firstBlockPos}
        setSelectedBlock={setSelectedBlock}
        setBlockContent={setBlockContent}
      />
    </div>
  );
};

export default ReactFlowy;
