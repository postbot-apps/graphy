import React, { useCallback, useState } from 'react';
import Arrow from './arrow';
import BlockComponent from './block';
import { useLocalDrop } from './hooks';
import { Block, Position } from './types';
import { computeAllBlockPos } from './utils';

interface CanvasProps {
  // eslint-disable-next-line no-unused-vars
  addNewBlock: (blocks: Block) => void;
  blocks: Block[];
  // eslint-disable-next-line no-unused-vars
  addFirstBlock: (blocks: Block) => void;
  padding: Position;
  // eslint-disable-next-line no-unused-vars
  changeParent: (id: number, parent: number) => void;
  templates: any;
  // eslint-disable-next-line no-unused-vars
  setFirstBlockPosition: (position: Position) => void;
  firstBlockPos: Position;
}

export const Canvas: React.FC<CanvasProps> = ({
  addNewBlock,
  blocks,
  addFirstBlock,
  padding,
  changeParent,
  templates,
  setFirstBlockPosition,
  firstBlockPos,
  setSelectedBlock,
}: CanvasProps) => {
  // @ts-ignore
  const [ref] = useLocalDrop(
    (pos: Position, item: { name: string; blockType: string }) => {
      if (blocks.length === 0) {
        setFirstBlockPosition(pos);
        addFirstBlock({
          parent: -1,
          id: 0,
          name: item.name,
          type: item.blockType,
          width: 200,
          height: 50,
        });
      }
    }
  );

  const blocksWithPos = computeAllBlockPos(blocks, firstBlockPos, padding);

  const minOffsetLeft = Math.min(...blocksWithPos.map((b) => b.x));
  if (minOffsetLeft < 20) {
    setFirstBlockPosition({
      ...firstBlockPos,
      x: firstBlockPos.x + Math.abs(minOffsetLeft) + 20,
    });
  }

  return (
    // @ts-ignore
    <div ref={ref} id="canvas" className="canvas">
      {blocksWithPos.map((b, i) => (
        <React.Fragment key={i}>
          <BlockComponent
            setSelectedBlock={setSelectedBlock}
            {...b}
            addNewBlock={addNewBlock}
            changeParent={changeParent}
            Template={templates[b.type]}
          />
          {b.arrow && <Arrow {...b.arrow} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Canvas;
