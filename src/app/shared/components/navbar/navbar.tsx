/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import {
  Button,
  BackButton,
  Dialog,
  TextInput,
  IconButton,
  LinkIcon,
  toaster,
} from 'evergreen-ui';
import { FunctionComponent, useRef, useState } from 'react';
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
  .navbar__actions {
    display: flex;
  }
`;

interface NavbarProps {
  title: string;
  description: string;
  onSave: () => void;
  onDiscard: () => void;
  onClear: () => void;
  id: string;
}

export const Navbar: FunctionComponent<NavbarProps> = ({
  title,
  description,
  onSave,
  onDiscard,
  onClear,
  id,
}: NavbarProps) => {
  const [showClearModal, setShowClearModal] = useState(false);
  const inputRef = useRef(null);

  const history = useHistory();

  const onClearData = () => {
    setShowClearModal(false);
    onClear();
  };

  const copyToClipboard = (e: any) => {
    inputRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    toaster.success('Url copied to clipboard', {
      duration: 1,
    });
  };

  return (
    <nav role="navigation" css={navbarStyles}>
      <div className="navbar__title">
        <BackButton onClick={() => history.push('/')} />
        <div className="navbar__title-text">
          <h4>{title}</h4>
          <p className="navbar__title-text-description">{description}</p>
        </div>
      </div>
      {/* <div className="navbar__options">
        <SegmentedControl
          width={240}
          options={options}
          value={optionValue}
          onChange={(value) => setOptionValue(value as string)}
        />
      </div> */}
      <div className="navbar__actions">
        <TextInput
          ref={inputRef}
          width={200}
          readOnly
          value={`https://loalhost:8000/survey/${id}`}
          name="text-input-name"
          placeholder="Text input placeholder..."
        />
        <IconButton icon={LinkIcon} onClick={copyToClipboard} marginRight={30} />
        <Button
          intent="danger"
          appearance="primary"
          marginRight={10}
          onClick={() => setShowClearModal(true)}
        >
          Clear
        </Button>
        <Button marginRight={10} onClick={onDiscard}>
          Discard
        </Button>
        <Button appearance="primary" onClick={onSave}>
          Save
        </Button>
      </div>
      <Dialog
        isShown={showClearModal}
        title="Danger"
        onConfirm={onClearData}
        onCloseComplete={() => setShowClearModal(false)}
        confirmLabel="Clear"
      >
        Are you sure want to clear the workflow. This will remove the workflow data
        from the database. This action is irreversible
      </Dialog>
    </nav>
  );
};
