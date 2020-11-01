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

export const GET_WORKFLOW = gql`
  query GetWorkflow($id: ID!) {
    getWorkflow(id: $id) {
      title
      type
      description
      firstBlockPosition {
        x
        y
      }
      nodes {
        type
        title
        description
        id
        blockId
        name
        parent
        option
        placeholder
        buttonText
        link
      }
    }
  }
`;

export const ADD_RESPONSE = gql`
  mutation AddResponse($response: [AddResponseInput!]!) {
    addResponse(input: $response) {
      response {
        id
        date
        data {
          id
          option
        }
      }
    }
  }
`;

export const UPDATE_RESPONSE = gql`
  mutation UpdateResponse($id: ID!, $updatedData: [DataRef!]) {
    updateResponse(input: { filter: { id: [$id] }, set: { data: $updatedData } }) {
      response {
        id
        date
        data {
          id
          option
        }
      }
    }
  }
`;
