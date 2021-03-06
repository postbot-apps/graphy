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

import { Block, Position } from './types';
import { cloneDeep } from 'lodash';

export const computeAllBlockPos = (
  blocks: Block[],
  firstBlockPos: Position,
  padding: Position
) => {
  const newBlocks = cloneDeep(blocks);
  recalcChildrenWidth(newBlocks, { id: -1 }, padding);
  return getBlocksWithPositions(newBlocks, firstBlockPos, padding);
};

export function getBlockChildren(
  blocks: Block[],
  block: Block | { id: number }
): Block[] {
  return blocks.filter((b) => b.parent === block.id);
}

export const recalcChildrenWidth = (
  blocks: Block[],
  parent: Block | { id: number },
  padding: Position
) => {
  const children = getBlockChildren(blocks, parent);
  if (children.length === 0) {
    // @ts-ignore
    parent.childWidth = parent.width;
    // @ts-ignore
    return parent.width;
  }
  let widthOfChildren = 0;
  children.forEach((child) => {
    widthOfChildren += recalcChildrenWidth(blocks, child, padding);
  });

  const childrenPadding = (children.length - 1) * padding.x;
  // @ts-ignore
  parent.childWidth = widthOfChildren + childrenPadding;
  // @ts-ignore
  return parent.childWidth;
};

export const getBlocksWithPositions = (
  blocks: Block[],
  firstBlockPos: Position,
  padding: Position
) => {
  const blocksWithPos = [...blocks];
  blocksWithPos.forEach((block) => {
    if (block.parent === -1) {
      block.x = firstBlockPos.x;
      block.y = firstBlockPos.y;
      return;
    }

    const parentBlock = blocksWithPos.find((b) => b.id === block.parent);
    let usedWidth = 0;
    getBlockChildren(blocksWithPos, parentBlock).forEach((child) => {
      if (child.childWidth > child.width) {
        child.x =
          parentBlock.x -
          parentBlock.childWidth / 2 +
          usedWidth +
          child.childWidth / 2;
        usedWidth += child.childWidth + padding.x;
      } else {
        child.x =
          parentBlock.x - parentBlock.childWidth / 2 + usedWidth + child.width / 2;
        usedWidth += child.width + padding.x;
      }
      child.y =
        parentBlock.y + padding.y + parentBlock.height / 2 + child.height / 2;
      child.arrow = generateArrow(child, parentBlock, padding);
    });
  });
  return blocksWithPos;
};

const generateArrow = (block: Block, parent: Block, padding: Position) => {
  const x = block.x - parent.x + 20;
  const y = padding.y;
  if (x < 0) {
    return {
      arrowPath: `M${parent.x - block.x + 5} 0L${parent.x - block.x + 5} ${
        padding.y / 2
      }L5 ${padding.y / 2}L5 ${y}`,
      pointerPath: `M0 ${y - 5}H10L5 ${y}L0 ${y - 5}Z`,
      x: block.x + block.width / 2 - 5,
      y: parent.y + parent.height,
    };
  }
  return {
    arrowPath: `M20 0L20 ${padding.y / 2}L${x} ${padding.y / 2}L${x} ${y}`,
    pointerPath: `M${x - 5} ${y - 5}H${x + 5}L${x} ${y}L${x - 5} ${y - 5}Z`,
    x: parent.x + parent.width / 2 - 20,
    y: parent.y + parent.height,
  };
};

/*
  Get all children of a block recursively
*/
export function getAllChildrenBlocks(
  blocks: Block[],
  parent: { id: number }
): Block[] {
  const children = getBlockChildren(blocks, parent);
  if (children.length === 0) {
    return [];
  } else {
    return [
      ...children,
      ...children.reduce(
        (acc, child) => acc.concat(getAllChildrenBlocks(blocks, { id: child.id })),
        []
      ),
    ];
  }
}
