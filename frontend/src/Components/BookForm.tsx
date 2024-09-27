import { gql, useMutation } from "@apollo/client";
import React, { forwardRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { GET_USER_AND_BOOK_ENTRIES } from "./UserDetailPage";

type Inputs = {
  title: string;
  author: string;
};

const CREATE_BOOK_ENTRY = gql`
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

const Input = forwardRef(function (
  {
    label,
    errorState,
    ...props
  }: {
    label: React.ReactNode;
    errorState: React.ReactNode;
  },
  ref
) {
  return (
    <div className="input-wrapper">
      {label}
      <input {...props} ref={ref} />
      {errorState}
    </div>
  );
});

export default function BookForm() {
  const { register, handleSubmit, formState } = useForm<Inputs>();
  const [bookMutation] = useMutation(CREATE_BOOK_ENTRY, {
    refetchQueries: [GET_USER_AND_BOOK_ENTRIES, "GetUserAndBookEntries"],
  });

  const { userId } = useParams();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    bookMutation({ variables: { ...data, userId } });

  // console.log(watch("book"));
  // console.log({ formState });

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("title", { required: true })}
        errorState={
          formState.errors.title && <span>This field is required</span>
        }
        label={<label htmlFor="title">Title</label>}
      />

      <Input
        {...register("author", { required: true })}
        errorState={
          formState.errors.author && <span>This field is required</span>
        }
        label={<label htmlFor="author">Author</label>}
      />

      <input type="submit" />
    </form>
  );
}
