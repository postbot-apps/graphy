import React from 'react';
import { useDrag } from 'react-dnd';

interface DragBlockProps {
  name: string;
  type: string;
}

export const DragBlock: React.FC<DragBlockProps> = ({
  name,
  type,
}: DragBlockProps) => {
  const [, drag] = useDrag({
    item: { name, type: 'block', blockType: type },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div className="dropzone">
      <div ref={drag} className="template">
        {name}
      </div>
    </div>
  );
};

export default DragBlock;
