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

export interface Block {
  __typename?: string;
  parent: number;
  id?: number;
  name: string;
  type: string;
  width: number;
  height: number;
  childWidth?: number;
  x?: number;
  y?: number;
  arrow?: {
    arrowPath: string;
    pointerPath: string;
    x: number;
    y: number;
  };
  blockId?: number;
}

export interface Position {
  __typename?: string;
  x: number;
  y: number;
}
