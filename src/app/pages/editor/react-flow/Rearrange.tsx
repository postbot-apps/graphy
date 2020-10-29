// // @ts-nocheck
// /**@jsx jsx */
// import { jsx } from '@emotion/core';
// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import Arrow from './arrow';
// import BlockComponent from './block';
// import { Portal } from './portal';
// import { Block, Position } from './types';
// import { computeAllBlockPos } from './utils';
// import _ from 'lodash';

// interface RearrangeProps {
//   blocks: Block[];
//   firstBlockPos: Position;
//   padding: Position;
// }

// export const Rearrange: React.FC<RearrangeProps> = ({
//   blocks,
//   firstBlockPos,
//   padding,
//   templates,
//   flowyStyles,
//   dragEvent,
// }: RearrangeProps) => {
//   // const blocksWithPos = useMemo(() => {
//   //   // console.log('COmputing..', firstBlockPos, blocks.length);
//   //   return computeAllBlockPos(blocks, firstBlockPos, padding);
//   // }, [firstBlockPos, blocks.length]);

//   // const blocksWithPos = useMemo(() => {
//   //   // console.log('COmputing..', firstBlockPos, blocks.length);
//   //   return computeAllBlockPos(blocks, firstBlockPos, padding);
//   // }, [firstBlockPos, blocks.length]);

//   // const memoizedCalc = _.memoize((firstBlockPos, blocks, padding) => {
//   //   console.log('CAl.ccc.');
//   //   return computeAllBlockPos(blocks, firstBlockPos, padding);
//   // });
//   // const blocksWithPos = memoizedCalc(firstBlockPos, blocks, padding);

//   // useEffect(() => {
//   //   // console.log('COmputing..', firstBlockPos, blocks.length);
//   // }, [firstBlockPos, blocks.length]);

//   const [firstBlockPos, setFirstBlockPos] = useState<Position>({});
//   const handleMouseMove = useCallback(
//     (e) => {
//       console.log('Mouse move', e.clientX, e.clientY);
//       const debounced = _.throttle(setFirstBlockPos, 100);
//       debounced({ x: e.clientX, y: e.clientY });
//     },
//     [firstBlockPos]
//   );

//   useEffect(() => {
//     console.log(dragEvent);
//     if (dragEvent) {
//       document.addEventListener('drag', handleMouseMove);
//     }
//   }, [dragEvent]);

//   const memoizedCalc = _.memoize((firstBlockPos, blocks, padding) => {
//     console.log('CAl.ccc.');
//     return computeAllBlockPos(blocks, firstBlockPos, padding);
//   });
//   const blocksWithPos = memoizedCalc(firstBlockPos, blocks, padding);

//   if (blocks.length <= 0) {
//     return null;
//   }
//   return (
//     <Portal>
//       <div css={flowyStyles}>
//         {/* <BlockComponent
//           {...blocks[0]}
//           x={firstBlockPos.x}
//           y={firstBlockPos.y}
//           Template={templates[blocks[0].type]}
//         /> */}
//         {blocksWithPos.map((b, i) => (
//           <React.Fragment key={i}>
//             <BlockComponent {...b} Template={templates[b.type]} />
//             {b.arrow && <Arrow {...b.arrow} />}
//           </React.Fragment>
//         ))}
//       </div>
//     </Portal>
//   );
// };

// export default Rearrange;
