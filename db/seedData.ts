import Database from "better-sqlite3";
import { Book, BookEntry, User } from "../types.js";
import { timeStamp } from "console";

type DB = ReturnType<typeof Database>;

const seedUsers: Partial<User>[] = [
  {
    firstName: "Danny",
    lastName: "Little",
    email: "dslittle22@gmail.com",
    isAdmin: true,
  },
  {
    firstName: "Emma",
    lastName: "Hatt",
    email: "emmahatt22@gmail.com",
    isAdmin: false,
  },
];

const seedBooks: Partial<Book>[] = [
  { author: "Octavia Butler", title: "Parable of the Sower" },
  { author: "Andy Weir", title: "Project Hail Mary" },
];

const seedBookEntries: Partial<BookEntry>[] = [
  { bookId: 1, userId: 1 },
  { bookId: 2, userId: 2 },
];

function dropTables(db: DB) {
  db.prepare("DROP TABLE IF EXISTS book_entries;").run();
  db.prepare("DROP TABLE IF EXISTS users;").run();
  db.prepare("DROP TABLE IF EXISTS books;").run();
}

function createUsersTable(db: DB) {
  db.prepare(
    `
    CREATE TABLE users (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL,
      isAdmin INTEGER DEFAULT (0) NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `
  ).run();
  for (const user of seedUsers) {
    db.prepare(
      `INSERT INTO users(firstName, lastName, email, isAdmin)
       VALUES (@firstName, @lastName, @email, @isAdmin)`
    ).run({
      ...user,
      isAdmin: user.isAdmin ? 1 : 0,
    });
  }
}

function createBooksTable(db: DB) {
  db.prepare(
    `
    CREATE TABLE books (
	    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `
  ).run();
  for (const book of seedBooks) {
    db.prepare(
      `INSERT INTO books(title, author)
       VALUES (@title, @author)`
    ).run({
      ...book,
    });
  }
}

function createBookEntriesTable(db: DB) {
  db.prepare(
    `
    CREATE TABLE book_entries (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      bookId INTEGER NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (bookId) REFERENCES books(id)
    )
  `
  ).run();
  for (const bookEntry of seedBookEntries) {
    db.prepare(
      `INSERT INTO book_entries(userId, bookId)
       VALUES (@userId, @bookId)`
    ).run({
      ...bookEntry,
    });
  }
}

export default function seedDb(db: DB) {
  dropTables(db);
  createUsersTable(db);
  createBooksTable(db);
  createBookEntriesTable(db);
}
