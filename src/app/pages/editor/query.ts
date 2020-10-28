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
        name
        parent
        width
      }
    }
  }
`;

export const UPDATE_WORKFLOW = gql`
  mutation UpdateWorkflow(
    $id: ID!
    $workflow: [NodeRef!]
    $firstBlockPos: PositionRef!
  ) {
    updateWorkflow(
      input: {
        filter: { id: [$id] }
        set: { nodes: $workflow, firstBlockPosition: $firstBlockPos }
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
          name
          parent
          width
        }
      }
    }
  }
`;
