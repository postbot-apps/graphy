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
