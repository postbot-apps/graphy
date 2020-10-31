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
