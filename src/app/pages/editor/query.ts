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

import gql from 'graphql-tag';

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
        height
        id
        blockId
        name
        parent
        width
        option
        placeholder
        buttonText
        link
      }
    }
  }
`;

export const UPDATE_WORKFLOW_CLEAR = gql`
  mutation UpdateWorkflow($id: ID!, $removenodes: WorkflowPatch!) {
    updateWorkflow(input: { filter: { id: [$id] }, remove: $removenodes }) {
      workflow {
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
          height
          id
          blockId
          name
          parent
          width
          option
          placeholder
          buttonText
          link
        }
      }
    }
  }
`;

export const UPDATE_WORKFLOW = gql`
  mutation UpdateWorkflow(
    $id: ID!
    $updatedNodes: [NodeRef!]
    $firstBlockPos: PositionRef!
  ) {
    updateWorkflow(
      input: {
        filter: { id: [$id] }
        set: { nodes: $updatedNodes, firstBlockPosition: $firstBlockPos }
      }
    ) {
      workflow {
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
          height
          id
          blockId
          name
          parent
          width
        }
      }
    }
  }
`;
