import { ApolloServer, ApolloServerPlugin } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import setupDb from "./db/setupDb.js";
import seedDb from "./db/seedData.js";
import { Book as BookType, BookEntry, Query, User } from "./types.js";
import { randomInt } from "crypto";
import Book from "./models/book.gql";

const loggingPlugin: ApolloServerPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(requestContext) {
    // console.log("Request started! Query:\n" + requestContext.request.query);
    // console.log("Request started!");
    // return {
    // Fires whenever Apollo Server will parse a GraphQL
    // request to create its associated document AST.
    // async parsingDidStart(requestContext) {
    // console.log("Parsing started!");
    // },
    // Fires whenever Apollo Server will validate a
    // request's document AST against your GraphQL schema.
    // async validationDidStart(requestContext) {
    //   console.log("Validation started!");
    // },
    // };
  },
};

const db = setupDb();
seedDb(db);

const resolvers = {
  Query: {
    books: () => db.prepare("SELECT * FROM books").all(),
    user: (_, { id }) => db.prepare("SELECT * FROM users where id = ?").get(id),
    users: () => db.prepare("SELECT * FROM users").all(),
    bookEntries: () => db.prepare("SELECT * FROM book_entries").all(),
  },
  BookEntry: {
    book(parent: Query<BookEntry>) {
      return db.prepare("SELECT * FROM books WHERE id = ?").get(parent.bookId);
    },
    user(parent: Query<BookEntry>) {
      return db.prepare("SELECT * FROM users WHERE id = ?").get(parent.userId);
    },
  },
  User: {
    bookEntries(parent: Query<User>) {
      return db
        .prepare("SELECT * FROM book_entries WHERE userId = ?")
        .all(parent.id);
    },
  },
  Mutation: {
    addBook: (_, { title, author, userId }) => {
      const { lastInsertRowid } = db
        .prepare(
          `INSERT INTO books(title, author)
       VALUES (@title, @author)`
        )
        .run({ title, author });

      db.prepare(
        `INSERT INTO book_entries(userId, bookId)
           VALUES (@userId, @bookId)`
      ).run({
        userId,
        bookId: lastInsertRowid,
      });

      return db
        .prepare("SELECT * FROM book_entries WHERE id = last_insert_rowid()")
        .get() as Query<BookEntry>;
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: [Book],
  resolvers,
  plugins: [loggingPlugin],
});

const main = async () => {
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at: ${url}`);
};

main();
