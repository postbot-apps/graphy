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
  Button,
  BackButton,
  Dialog,
  TextInput,
  Text,
  toaster,
  Tooltip,
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

  .navbar__options {
    align-items: center;
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
  type: string;
}

const APP_ENDPOINT: string = process.env.APP_ENDPOINT;

export const Navbar: FunctionComponent<NavbarProps> = ({
  title,
  description,
  onSave,
  onDiscard,
  onClear,
  id,
  type,
}: NavbarProps) => {
  const [showClearModal, setShowClearModal] = useState(false);
  const inputRef = useRef(null);

  const history = useHistory();

  const onClearData = () => {
    setShowClearModal(false);
    onClear();
  };

  const copyToClipboard = () => {
    inputRef.current.select();
    document.execCommand('copy');
    toaster.success('Url copied to clipboard', {
      duration: 1,
    });
  };

  const PREVIEW_LINK =
    type === 'Diagram'
      ? `${APP_ENDPOINT}/preview/${id}`
      : `${APP_ENDPOINT}/survey/${id}`;

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
        <Text fontWeight="bold" marginRight={10}>
          {type} URL :
        </Text>
        <Tooltip content="Click to copy">
          <div onClick={copyToClipboard}>
            <TextInput
              ref={inputRef}
              width={300}
              readOnly
              value={PREVIEW_LINK}
              name="text-input-name"
              placeholder="Text input placeholder..."
            />
          </div>
        </Tooltip>
        <Button is="a" marginLeft={10} target="_blank" href={PREVIEW_LINK}>
          Preview
        </Button>
      </div>
      <div className="navbar__actions">
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
