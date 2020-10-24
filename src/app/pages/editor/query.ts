import gql from 'graphql-tag';

export const GET_WORKFLOW = gql`
  query GetWorkflow($id: ID!) {
    getWorkflow(id: $id) {
      title
      type
      description
    }
  }
`;
