import gql from 'graphql-tag';

export const GET_WORKFLOW = gql`
  query GetWorkflow($id: ID!) {
    getWorkflow(id: $id) {
      title
      type
      description
      nodes {
        type
        type
        title
        description
        childWidth
        height
        id
        name
        parent
        width
        x
        y
      }
    }
  }
`;

export const UPDATE_WORKFLOW = gql`
  mutation UpdateWorkflow($id: ID!, $workflow: [NodeRef!]) {
    updateWorkflow(input: { filter: { id: [$id] }, set: { nodes: $workflow } }) {
      workflow {
        title
        type
        description
        nodes {
          type
          title
          description
          childWidth
          height
          id
          name
          parent
          width
          x
          y
        }
      }
    }
  }
`;
