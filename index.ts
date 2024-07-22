import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import setupDb from "./db/setupDb.js";
import seedDb from "./db/seedData.js";
import { BookEntry, Query } from "./types.js";

const typeDefs = `#graphql
  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: Int!
    timestamp: String!
    title: String!
    author: String!
  }

  type User {
    id: Int!
    timestamp: String!
    firstName: String!
    lastName: String!
    email: String!
    isAdmin: Int!
  }

  type BookEntry {
    id: Int!
    timestamp: String!
    book: Book!
    user: User!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]!
    users: [User]!
    bookEntries: [BookEntry]
  }

`;

const db = setupDb();
seedDb(db);

const resolvers = {
  Query: {
    books: () => db.prepare("SELECT * FROM books").all(),
    users: () => db.prepare("SELECT * FROM users").all(),
    bookEntries: () => {
      const bookEntries: Query<BookEntry>[] = db
        .prepare("SELECT * FROM book_entries")
        .all() as any as Query<BookEntry>[];

      const result: any[] = [];
      for (const bookEntry of bookEntries) {
        const book = db
          .prepare("SELECT * FROM books WHERE id = ?")
          .get(bookEntry.bookId);
        const user = db
          .prepare("SELECT * FROM users WHERE id = ?")
          .get(bookEntry.userId);
        result.push({ ...bookEntry, book, user });
      }
      console.log(result);
      return result;
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
