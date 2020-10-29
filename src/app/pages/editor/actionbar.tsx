/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import {
  IconButton,
  DoubleChevronLeftIcon,
  DoubleChevronRightIcon,
} from 'evergreen-ui';
import { FunctionComponent, useState } from 'react';
import DragBlock from './react-flow/dragBlock';

const actionBarStyles = (shown: boolean) => css`
  z-index: 10;
  height: calc(100vh - 128px);
  padding: 30px 0px;
  width: ${shown ? '380px' : '0px'};
  position: relative;
  border-right: 1px solid #e8e8ef;
  border-bottom: 1px solid #e8e8ef;
  transition: width 0.3s;
  .actionbar__content {
    max-width: 100%;
    transition: 0.1s ease;
    transform: ${shown ? 'translateX(0)' : 'translateX(-100%)'};
    overflow: hidden;
  }
  .actionbar__hide {
    position: absolute;
    right: -40px;
    top: 20px;
  }
  .actionBar__title {
    margin: 20px;
  }
`;

const tabStyles = (selected: boolean) => css`
  cursor: pointer;
  .tab__title {
    color: ${selected ? 'rgb(23,43,77)' : '#808292'};
    border-bottom: ${selected ? '4px solid #47B881' : 'none'};
    font-weight: 400;
    padding: 10px 10px;
  }
  &:hover {
    .tab__title {
      color: rgb(23, 43, 77);
    }
  }
`;

const tabsHolderStyles = css`
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  border-bottom: 1px solid #e8e8ef;
`;

const tabsDataHolderStyles = css`
  padding: 20px;
`;

const tabDataContentStyles = (selected: boolean) => css`
  display: ${selected ? 'block' : 'none'};
  .tabdata__action {
    padding-bottom: 10px;
  }
`;

interface ActionBarProps {}

const tabs = ['Triggers', 'Actions', 'Loggers'];

const actions = [
  ['query', 'action', 'success'],
  ['action', 'warning', 'success'],
  ['query', 'action', 'error'],
];

const ActionBar: FunctionComponent<ActionBarProps> = () => {
  const [isActionBarShown, setIsActionBarShown] = useState(true);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <div css={actionBarStyles(isActionBarShown)}>
      <div className="actionbar__hide">
        <IconButton
          height={40}
          onClick={() => setIsActionBarShown(!isActionBarShown)}
          icon={isActionBarShown ? DoubleChevronLeftIcon : DoubleChevronRightIcon}
        />
      </div>
      <div className="actionbar__content">
        <h3 className="actionBar__title">Action blocks</h3>
        <div>
          <div css={tabsHolderStyles}>
            {tabs.map((tab, index) => (
              <div
                css={tabStyles(index === selectedTabIndex)}
                key={tab}
                onClick={() => {
                  setSelectedTabIndex(index);
                }}
              >
                <h4 className="tab__title">{tab}</h4>
              </div>
            ))}
          </div>
          <div css={tabsDataHolderStyles}>
            {actions.map((action, index) => (
              <div
                key={`action-${index}`}
                css={tabDataContentStyles(index === selectedTabIndex)}
              >
                {action.map((a: string) => (
                  <DragBlock key={a} type={a} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
