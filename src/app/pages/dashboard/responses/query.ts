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

import { gql } from '@apollo/client';

export const GET_RESPONSES = gql`
  query GetResponses($email: String!) {
    getUser(email: $email) {
      workflows {
        id
        title
        type
        description
        responses(order: { desc: date }) {
          id
          date
        }
      }
    }
  }
`;

export const GET_RESPONSE = gql`
  query GetResponse($id: ID!) {
    getResponse(id: $id) {
      id
      date
      data {
        id
        option
      }
      workflow {
        id
        title
        nodes {
          id
          blockId
          title
          type
          parent
        }
      }
    }
  }
`;
