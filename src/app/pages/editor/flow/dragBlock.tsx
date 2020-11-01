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
import {
  Icon,
  DragHandleVerticalIcon,
  DiagramTreeIcon,
  FormIcon,
  InboxIcon,
  LinkIcon,
  TextHighlightIcon,
  NewTextBoxIcon,
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
    flex: 1;
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
  input: {
    icon: TextHighlightIcon,
    name: 'Text Input',
    description: 'Shows a text input box.',
  },
  options: {
    icon: DiagramTreeIcon,
    name: 'Options',
    description: 'Can add options.',
  },
  optionsItem: {
    icon: InboxIcon,
    name: 'Options Item',
    description: 'Items for each options.',
  },
  text: {
    icon: NewTextBoxIcon,
    name: 'Text',
    description: 'Shows a text.',
  },
  link: {
    icon: LinkIcon,
    name: 'Link',
    description: 'Shows a button with link.',
  },
  checkbox: {
    icon: FormIcon,
    name: 'Checkbox',
    description: 'Shows a checkbox.',
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
