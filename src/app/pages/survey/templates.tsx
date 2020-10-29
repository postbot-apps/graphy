/**@jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useState } from 'react';
import { Button, Pane, TextInput } from 'evergreen-ui';

const OptionsTemplate: FunctionComponent<any> = ({ block, selectOption }: any) => {
  return (
    <Pane marginTop={20}>
      {block.options.map((option) => (
        <Button
          key={option.id}
          marginRight={16}
          onClick={() => {
            selectOption(option);
          }}
        >
          {option.text}
        </Button>
      ))}
    </Pane>
  );
};

const TextTemplate: FunctionComponent<any> = () => {
  return <Pane marginTop={20}></Pane>;
};

const TextInputTemplate: FunctionComponent<any> = ({ block, saveInput }) => {
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
  input: TextInputTemplate,
};

export default (props) => {
  const Template = templates[props.block.type];
  return <Template {...props} />;
};
