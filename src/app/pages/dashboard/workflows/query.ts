import gql from 'graphql-tag';

export const ADD_WORKFLOW = gql`
  mutation AddWorkflow($workflow: [AddWorkflowInput!]!) {
    addWorkflow(input: $workflow) {
      workflow {
        id
        title
        type
        description
        creator {
          email
        }
      }
    }
  }
`;

export const GET_WORKFLOWS = gql`
  query GetWorkflows($email: String!) {
    getUser(email: $email) {
      workflows {
        id
        title
        type
        description
      }
    }
  }
`;
