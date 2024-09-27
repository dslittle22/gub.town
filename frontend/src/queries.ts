import { gql } from "@apollo/client";

export const GET_USER_AND_BOOK_ENTRIES = gql`
  query GetUserAndBookEntries($id: String) {
    user(id: $id) {
      id
      firstName
      lastName
      bookEntries {
        id
        timestamp
        book {
          title
          author
        }
      }
    }
  }
`;
