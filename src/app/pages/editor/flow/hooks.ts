import { useRef } from 'react';
import { useDrop } from 'react-dnd';

// eslint-disable-next-line no-unused-vars
export function useLocalDrop(onDrop: (pos: any, item: any) => void) {
  const ref = useRef();

  const [dropDetails, dropTarget] = useDrop({
    accept: ['block', 'block-rearrange'],
    drop(item: any, monitor: any) {
      const offset = monitor.getSourceClientOffset();
      if (offset && ref.current) {
        // @ts-ignore
        const dropTargetXy = ref.current.getBoundingClientRect();
        onDrop(
          {
            x: offset.x - dropTargetXy.left,
            y: offset.y - dropTargetXy.top,
          },
          item
        );
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return [
    (elem: any) => {
      ref.current = elem;
      dropTarget(ref);
    },
    dropDetails,
  ];
}
