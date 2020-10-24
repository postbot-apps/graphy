/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { Button, BackButton, SegmentedControl } from 'evergreen-ui';
import { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';

const navbarStyles = css`
  padding: 15px 20px;
  display: flex;
  border: 1px solid #e8e8ef;
  justify-content: space-between;
  .navbar__title {
    display: flex;
    .navbar__title-text {
      padding-left: 10px;
      .navbar__title-text-description {
        font-size: 14px;
        color: #808292;
      }
    }
  }
`;

interface NavbarProps {
  title: string;
  description: string;
  onSave: () => void;
  onDiscard: () => void;
}

export const Navbar: FunctionComponent<NavbarProps> = ({
  title,
  description,
  onSave,
  onDiscard,
}: NavbarProps) => {
  const [optionValue, setOptionValue] = useState('diagram');

  const history = useHistory();

  const options = [
    { label: 'Diagram View', value: 'diagram' },
    { label: 'Code View', value: 'code' },
  ];

  return (
    <nav role="navigation" css={navbarStyles}>
      <div className="navbar__title">
        <BackButton onClick={() => history.push('/')} />
        <div className="navbar__title-text">
          <h4>{title}</h4>
          <p className="navbar__title-text-description">{description}</p>
        </div>
      </div>
      <div className="navbar__options">
        <SegmentedControl
          width={240}
          options={options}
          value={optionValue}
          onChange={(value) => setOptionValue(value as string)}
        />
      </div>
      <div className="navbar__actions">
        <Button marginRight={10} onClick={onDiscard}>
          Discard
        </Button>
        <Button appearance="primary" marginLeft={10} onClick={onSave}>
          Save
        </Button>
      </div>
    </nav>
  );
};