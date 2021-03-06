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
import { useAuth0 } from '@auth0/auth0-react';
import { jsx, css } from '@emotion/core';
import { IconButton, HomeIcon, LogOutIcon, PanelTableIcon } from 'evergreen-ui';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../../../../assets/images/logo.png';

const sidebarStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 200;
  margin: 0;
  padding: 0;
  background: #08143b;
`;

const navbarStyles = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
  padding-top: 24px;
  height: 100vh;
  width: 64px;
`;

const navIconStyles = css`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  align-items: center;
`;

const iconButtonStyles = css`
  margin: 5px auto;
  svg {
    fill: #fff !important;
  }
  transition: 0.5s ease;
  &:hover {
    transition: 0.5s ease;
    background: rgb(255 255 255 / 10%) !important;
  }
`;

interface SideBarProps {}

export const SideBar: FunctionComponent<SideBarProps> = () => {
  const { isAuthenticated } = useAuth0();
  const { logout } = useAuth0();
  const history = useHistory();

  return (
    isAuthenticated && (
      <div css={sidebarStyles}>
        <nav css={navbarStyles} role="navigation" aria-label="sidebar">
          <div>
            <img width={50} height={50} src={Logo} alt="logo" />
            <div css={navIconStyles}>
              <IconButton
                css={iconButtonStyles}
                appearance="minimal"
                color="white"
                height={50}
                icon={HomeIcon}
                onClick={() => history.push('/')}
              />
              <IconButton
                css={iconButtonStyles}
                appearance="minimal"
                height={50}
                icon={PanelTableIcon}
                onClick={() => history.push('/responses')}
              />
            </div>
          </div>
          <IconButton
            css={iconButtonStyles}
            appearance="minimal"
            height={50}
            icon={LogOutIcon}
            onClick={() => logout({ returnTo: window.location.origin })}
          />
        </nav>
      </div>
    )
  );
};
