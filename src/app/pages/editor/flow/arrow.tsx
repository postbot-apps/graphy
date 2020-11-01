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

import React from 'react';

interface ArrowProps {
  x: number;
  y: number;
  arrowPath: string;
  pointerPath: string;
}

export const Arrow: React.FC<ArrowProps> = ({
  x,
  y,
  arrowPath,
  pointerPath,
}: ArrowProps) => {
  return (
    <div className="arrow-block" style={{ left: x, top: y }}>
      <svg preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={arrowPath} stroke="#000" strokeWidth="2px"></path>
        <path d={pointerPath} fill="#000"></path>
      </svg>
    </div>
  );
};

export default Arrow;
