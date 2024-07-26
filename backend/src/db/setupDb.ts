import Database from "better-sqlite3";

export default function setupDb() {
  const db = new Database("../db/db.sqlite", { fileMustExist: false });
  db.pragma("journal_mode = WAL");
  return db;
}
