import React, { useState } from 'react';
import Arrow from './arrow';
import BlockComponent from './block';
import { useLocalDrop } from './hooks';
import { Block, Position } from './types';
import { computeAllBlockPos, getAllChildrenBlocks } from './utils';

interface CanvasProps {
  // eslint-disable-next-line no-unused-vars
  addNewBlock: (blocks: Block) => void;
  blocks: Block[];
  // eslint-disable-next-line no-unused-vars
  addFirstBlock: (blocks: Block) => void;
  padding: Position;
  // eslint-disable-next-line no-unused-vars
  changeParent: (id: number, parent: number) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  addNewBlock,
  blocks,
  addFirstBlock,
  padding,
  changeParent,
}: CanvasProps) => {
  const [firstBlockPos, setFirstBlockPos] = useState<Position>({ x: 0, y: 0 });
  const [ref] = useLocalDrop((pos: Position, item: { name: string }) => {
    if (blocks.length === 0) {
      setFirstBlockPos(pos);
      addFirstBlock({
        parent: -1,
        id: 0,
        name: item.name,
        type: item.name,
        width: 200,
        height: 50,
      });
    }
  });
  const blocksWithPos = computeAllBlockPos(blocks, firstBlockPos, padding);
  return (
    // @ts-ignore
    <div ref={ref} id="canvas" className="canvas">
      {blocksWithPos.map((b, i) => (
        <React.Fragment key={i}>
          <BlockComponent
            {...b}
            addNewBlock={addNewBlock}
            changeParent={changeParent}
          />
          {b.arrow && <Arrow {...b.arrow} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Canvas;
