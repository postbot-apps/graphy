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
import TaskAction from '../actions/taskAction';
import InputAction from '../actions/inputAction';
import OptionsAction from '../actions/optionsAction';
import OptionsItemAction from '../actions/optionsItemAction';
import TextItemAction from '../actions/textItemAction';
import LinkItemAction from '../actions/linkItemAction';

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

export const InputBlockTemplate: React.FC<BlockTemplateProps> = ({
  block = {},
  setBlockContent,
}: BlockTemplateProps) => {
  return (
    <InputAction
      type={block.type}
      title={block.title}
      description={block.description}
      placeholder={block.placeholder}
      setBlockContent={setBlockContent}
    />
  );
};

export const OptionsBlockTemplate: React.FC<BlockTemplateProps> = ({
  block = {},
  setBlockContent,
}: BlockTemplateProps) => {
  return (
    <OptionsAction
      type={block.type}
      title={block.title}
      description={block.description}
      setBlockContent={setBlockContent}
    />
  );
};

export const OptionsItemBlockTemplate: React.FC<BlockTemplateProps> = ({
  block = {},
  setBlockContent,
}: BlockTemplateProps) => {
  return (
    <OptionsItemAction
      type={block.type}
      option={block.option}
      setBlockContent={setBlockContent}
    />
  );
};

export const LinkItemBlockTemplate: React.FC<BlockTemplateProps> = ({
  block = {},
  setBlockContent,
}: BlockTemplateProps) => {
  return (
    <LinkItemAction
      type={block.type}
      title={block.title}
      description={block.description}
      link={block.link}
      buttonText={block.buttonText}
      setBlockContent={setBlockContent}
    />
  );
};

export const TextItemBlockTemplate: React.FC<BlockTemplateProps> = ({
  block = {},
  setBlockContent,
}: BlockTemplateProps) => {
  return (
    <TextItemAction
      type={block.type}
      title={block.title}
      description={block.description}
      setBlockContent={setBlockContent}
    />
  );
};

export default {
  input: InputBlockTemplate,
  options: OptionsBlockTemplate,
  optionsItem: OptionsItemBlockTemplate,
  text: TextItemBlockTemplate,
  link: LinkItemBlockTemplate,
  checkbox: QueryBlockTemplate,
};
