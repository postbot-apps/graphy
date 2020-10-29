import { gql } from '@apollo/client';

export const GET_RESPONSES = gql`
  query GetResponses($email: String!) {
    getUser(email: $email) {
      workflows {
        id
        title
        type
        description
        responses {
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
    }
  }
`;
