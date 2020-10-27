import React from 'react';
import TaskAction from '../actions/taskAction';

interface BlockTemplateProps {
  block: any;
  // eslint-disable-next-line no-unused-vars
  setBlockContent: (type: string, value: string) => void;
}

export const BlockTemplate: React.FC<BlockTemplateProps> = ({
  block,
}: BlockTemplateProps) => {
  return <div>{block.title} Block</div>;
};

export const TaskBlockTemplate: React.FC<BlockTemplateProps> = ({
  block = {},
  setBlockContent,
}: BlockTemplateProps) => {
  return (
    <TaskAction
      title={block.title}
      description={block.description}
      setBlockContent={setBlockContent}
    />
  );
};

export default {
  input: TaskBlockTemplate,
  options: BlockTemplate,
  text: BlockTemplate,
  email: BlockTemplate,
};
