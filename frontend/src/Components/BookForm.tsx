import { useMutation } from "@apollo/client";
import React, { forwardRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { GET_USER_AND_BOOK_ENTRIES } from "./../queries";
import { CREATE_BOOK_ENTRY } from "../mutations";

type Inputs = {
  title: string;
  author: string;
};

const Input = forwardRef<
  HTMLInputElement,
  {
    label: React.ReactNode;
    errorState: React.ReactNode;
  } & React.InputHTMLAttributes<HTMLInputElement>
>(function ({ label, errorState, ...props }, ref) {
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
