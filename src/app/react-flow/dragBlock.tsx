import React from 'react';
import { useDrag } from 'react-dnd';

interface DragBlockProps {
  name: string;
}

export const DragBlock: React.FC<DragBlockProps> = ({ name }: DragBlockProps) => {
  const [, drag] = useDrag({
    item: { name, type: 'block' },
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
