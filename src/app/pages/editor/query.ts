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
