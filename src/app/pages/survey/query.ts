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
        workflowId
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
        workflowId
        date
        data {
          id
          option
        }
      }
    }
  }
`;
