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

import React, { Dispatch, SetStateAction } from 'react';
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
  setSelectedBlock: Dispatch<SetStateAction<number>>;
  // eslint-disable-next-line no-unused-vars
  setBlockContent: (type: string, value: string) => void;
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
  setBlockContent,
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
          width: 300,
          height: 120,
        });
      }
    }
  );

  console.log(firstBlockPos);
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
            setBlockContent={setBlockContent}
            blocks={blocks}
          />
          {b.arrow && <Arrow {...b.arrow} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Canvas;
