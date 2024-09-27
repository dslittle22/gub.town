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

export const CREATE_BOOK_ENTRY = gql`
  mutation CreateBookEntry(
    $title: String!
    $author: String!
    $userId: String!
  ) {
    addBook(title: $title, author: $author, userId: $userId) {
      book {
        id
      }
    }
  }
`;
