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

import { Pane, Heading, Text } from 'evergreen-ui';
import React from 'react';

export const NotFoundPage = () => (
  <Pane
    height="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
  >
    <Heading fontSize="90px">404</Heading>
    <Text marginTop={60} size={400}>
      We are sorry but the page you were looking for was not found!...
    </Text>
  </Pane>
);
