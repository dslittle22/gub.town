export type Book = {
  author: string;
  title: string;
};

export type User = {
  firstName: string;
  lastName: string;
  timestamp: number;
  email: string;
  isAdmin: boolean;
};

export type BookEntry = {
  userId: number;
  bookId: number;
};

export type Query<T> = T & {
  id: number;
  timestamp: number | string;
};
