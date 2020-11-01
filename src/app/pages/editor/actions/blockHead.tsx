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

/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { Icon } from 'evergreen-ui';
import { FunctionComponent } from 'react';
import { blockData } from '../flow/dragBlock';

const blockHeadStyles = css`
  border-bottom: 1px solid #e9e9ef;
  padding: 10px 20px;
  .blockHead__content {
    display: flex;
    align-items: center;
    .blockHead__content-title {
      margin-left: 10px;
      font-size: 16px;
    }
  }
`;

interface BlockHeadProps {
  type: string;
}

const BlockHead: FunctionComponent<BlockHeadProps> = ({ type }: BlockHeadProps) => {
  return (
    <div css={blockHeadStyles}>
      <div className="blockHead__content">
        <Icon icon={blockData[type].icon} color="#47B881" size={24} />
        <h3 className="blockHead__content-title">{blockData[type].name}</h3>
      </div>
    </div>
  );
};

export default BlockHead;
