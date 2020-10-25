import React, { useState } from 'react';
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
}

export const BlockComponent: React.FC<BlockProps> = ({
  x,
  y,
  name,
  addNewBlock,
  id,
  parent,
  changeParent,
}: BlockProps) => {
  const [hideDragArea, setHideDragArea] = useState(false);
  // @ts-ignore
  const [ref, { isOver }] = useLocalDrop((pos, item) => {
    if (item.type === 'block') {
      addNewBlock({
        parent: id,
        name: item.name,
        type: item.name,
        width: 200,
        height: 50,
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
    <div
      ref={drag}
      className={`block ${isOver ? 'show-indicator' : ''}`}
      style={{ left: x, top: y }}
    >
      {name}
      {!hideDragArea && (
        <div className="drag-area-container">
          {/* @ts-ignore */}
          <div ref={ref} className="drag-area"></div>
        </div>
      )}
    </div>
  );
};

export default BlockComponent;
