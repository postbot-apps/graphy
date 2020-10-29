// @ts-nocheck
import React from 'react';

interface BlockTemplateProps {
  name: string;
  type: string;
}

export const BlockTemplate: React.FC<BlockTemplateProps> = ({
  type,
}: BlockTemplateProps) => {
  return <div>{type} Block</div>;
};

export const InputBlockTemplate: React.FC<BlockTemplateProps> = ({
  text,
}: BlockTemplateProps) => {
  return <div>Input Block {text}</div>;
};

export default {
  input: InputBlockTemplate,
  options: BlockTemplate,
  text: BlockTemplate,
  email: BlockTemplate,
};
