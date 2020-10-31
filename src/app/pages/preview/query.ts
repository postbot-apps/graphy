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
        height
        id
        blockId
        name
        parent
        width
      }
    }
  }
`;
