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

export const QueryBlockTemplate: React.FC<BlockTemplateProps> = ({
  block = {},
  setBlockContent,
}: BlockTemplateProps) => {
  return (
    <TaskAction
      type={block.type}
      title={block.title}
      description={block.description}
      setBlockContent={setBlockContent}
    />
  );
};

export const ActionBlockTemplate: React.FC<BlockTemplateProps> = ({
  block = {},
  setBlockContent,
}: BlockTemplateProps) => {
  return (
    <TaskAction
      type={block.type}
      title={block.title}
      description={block.description}
      setBlockContent={setBlockContent}
    />
  );
};

export const SuccessBlockTemplate: React.FC<BlockTemplateProps> = ({
  block = {},
  setBlockContent,
}: BlockTemplateProps) => {
  return (
    <TaskAction
      type={block.type}
      title={block.title}
      description={block.description}
      setBlockContent={setBlockContent}
    />
  );
};

export const ErrorBlockTemplate: React.FC<BlockTemplateProps> = ({
  block = {},
  setBlockContent,
}: BlockTemplateProps) => {
  return (
    <TaskAction
      type={block.type}
      title={block.title}
      description={block.description}
      setBlockContent={setBlockContent}
    />
  );
};

export const WarningBlockTemplate: React.FC<BlockTemplateProps> = ({
  block = {},
  setBlockContent,
}: BlockTemplateProps) => {
  return (
    <TaskAction
      type={block.type}
      title={block.title}
      description={block.description}
      setBlockContent={setBlockContent}
    />
  );
};

export default {
  query: QueryBlockTemplate,
  action: ActionBlockTemplate,
  success: SuccessBlockTemplate,
  warning: WarningBlockTemplate,
  error: ErrorBlockTemplate,
};
