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
import { jsx } from '@emotion/core';
import { FunctionComponent, useState } from 'react';
import { Button, Pane, TextInput } from 'evergreen-ui';

const OptionsTemplate: FunctionComponent<any> = ({ block, selectOption }: any) => {
  return (
    <Pane marginTop={20}>
      {block.options.map((option: any) => (
        <Button
          key={option.id}
          marginRight={block.options.length > 1 ? 16 : 0}
          onClick={() => {
            selectOption(option);
          }}
        >
          {option.option}
        </Button>
      ))}
    </Pane>
  );
};

const TextTemplate: FunctionComponent<any> = () => {
  return <Pane marginTop={20}></Pane>;
};

const LinkTemplate: FunctionComponent<any> = ({ block }: any) => {
  return (
    <Pane marginTop={20}>
      <Button is="a" href={block.link} target="_blank">
        {block.buttonText}
      </Button>
    </Pane>
  );
};

const TextInputTemplate: FunctionComponent<any> = ({ block, saveInput }: any) => {
  const [value, setValue] = useState('');
  return (
    <Pane marginTop={20}>
      <TextInput
        placeholder={block.placeholder}
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
      />
      <Button appearance="primary" marginLeft={10} onClick={() => saveInput(value)}>
        Submit
      </Button>
    </Pane>
  );
};

const templates = {
  options: OptionsTemplate,
  text: TextTemplate,
  link: LinkTemplate,
  input: TextInputTemplate,
};

// eslint-disable-next-line react/display-name
export default (props: any) => {
  // @ts-expect-error
  const Template = templates[props.block.type];
  return <Template {...props} />;
};
