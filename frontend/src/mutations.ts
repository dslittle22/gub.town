import { gql } from "@apollo/client";

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
