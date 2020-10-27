/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import {
  Icon,
  EyeOpenIcon,
  DragHandleVerticalIcon,
  BuildIcon,
  CrownIcon,
  WarningSignIcon,
  ErrorIcon,
} from 'evergreen-ui';
import { useDrag } from 'react-dnd';

const dragBlockStyles = css`
  display: flex;
  align-items: flex-start;
  width: 100%;
  justify-content: space-between;
  padding: 15px 5px;
  margin-bottom: 10px;
  .dragBlock__content {
    display: flex;
    align-items: flex-start;
    .dragBlock__content-text {
      margin-left: 10px;
      h3 {
        font-size: 16px;
      }
      p {
        margin-top: 5px;
        font-size: 14px;
        color: #808292;
        line-height: 21px;
      }
    }
  }
  &:hover {
    box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.08);
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
  }
`;

interface DragBlockProps {
  type: string;
}

interface BlockDataInfo {
  icon: typeof Icon;
  name: string;
  description: string;
}

export const blockData: Record<string, BlockDataInfo> = {
  query: {
    icon: EyeOpenIcon,
    name: 'New Query',
    description: 'Triggers when somebody encounters a new query',
  },
  action: {
    icon: BuildIcon,
    name: 'Action is Performed',
    description: 'Triggers when somebody performs a specified action',
  },
  success: {
    icon: CrownIcon,
    name: 'Action was successfull',
    description: 'Triggers when some action is successfull',
  },
  warning: {
    icon: WarningSignIcon,
    name: 'Action has a warning',
    description: 'Triggers when some action has a warning',
  },
  error: {
    icon: ErrorIcon,
    name: 'Action has an error',
    description: 'Triggers when some action has an error',
  },
};

export const DragBlock: React.FC<DragBlockProps> = ({ type }: DragBlockProps) => {
  const [, drag] = useDrag({
    item: { name: blockData[type].name, type: 'block', blockType: type },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div className="dropzone">
      <div ref={drag} css={dragBlockStyles}>
        <Icon
          marginTop="5px"
          icon={DragHandleVerticalIcon}
          size={22}
          color="#ced0d7"
        />
        <div className="dragBlock__content">
          <Icon
            icon={blockData[type].icon}
            padding={10}
            size={24}
            borderRadius="4px"
            background="#f1f4fc"
            color="#8a8c9a"
          />
          <div className="dragBlock__content-text">
            <h3>{blockData[type].name}</h3>
            <p>{blockData[type].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragBlock;
