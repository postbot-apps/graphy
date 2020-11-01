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

import React, { Dispatch, SetStateAction, useState } from 'react';
import { useLocalDrop } from './hooks';
import { Block } from './types';
import { useDrag } from 'react-dnd';

interface BlockProps {
  x?: number;
  y?: number;
  name: string;
  // eslint-disable-next-line no-unused-vars
  addNewBlock: (blocks: Block) => void;
  id?: number;
  parent?: number;
  // eslint-disable-next-line no-unused-vars
  changeParent: (id: number, parent: number) => void;
  Template: any;
  setSelectedBlock: Dispatch<SetStateAction<number>>;
  text?: string;
  // eslint-disable-next-line no-unused-vars
  setBlockContent: (type: string, value: string) => void;
  blocks: any;
}

export const BlockComponent: React.FC<BlockProps> = ({
  x,
  y,
  name,
  addNewBlock,
  id,
  parent,
  changeParent,
  Template,
  setSelectedBlock,
  text,
  setBlockContent,
  blocks,
}: BlockProps) => {
  const [hideDragArea, setHideDragArea] = useState(false);
  // @ts-ignore
  const [ref, { isOver }] = useLocalDrop((pos, item) => {
    if (item.type === 'block') {
      addNewBlock({
        parent: id,
        name: item.name,
        type: item.blockType,
        width: 300,
        height: 120,
      });
    } else {
      changeParent(item.id, id);
    }
  });
  const [, drag] = useDrag({
    item: { name, id, type: 'block-rearrange' },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    begin: () => {
      setHideDragArea(true);
    },
    end: () => {
      setHideDragArea(false);
    },
    canDrag: () => parent !== -1,
  });
  return (
    <>
      <div
        ref={drag}
        className={`block ${isOver ? 'show-indicator' : ''}`}
        style={{ left: x, top: y }}
        onClick={() => setSelectedBlock(id)}
      >
        {/* {name} */}
        <Template
          text={text}
          setBlockContent={setBlockContent}
          block={blocks.find((d: any) => d.id === id)}
        />
        {!hideDragArea && (
          <div className="drag-area-container">
            {/* @ts-ignore */}
            <div ref={ref} className="drag-area"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlockComponent;
