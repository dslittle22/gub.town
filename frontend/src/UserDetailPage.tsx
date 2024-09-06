import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { Query, User } from "./types";
import { Temporal } from "@js-temporal/polyfill";

const UserDetailPage = () => {
  const params = useParams();

  const { loading, error, data } = useQuery<{ user: Query<User> | null }>(
    gql`
      query ExampleQuery($id: String) {
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
    `,
    {
      variables: {
        id: params.userId,
      },
    }
  );

  if (error) return <span>:(</span>;
  if (loading || !data) return <span>loading...</span>;
  const { user } = data;

  if (!user) {
    throw new Error("User not found!");
  }

  return (
    <>
      <div className="mb-4">
        <Link to="/">&larr; Back</Link>
      </div>
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      <ol>
        {user.bookEntries.map(({ id, book, timestamp }) => {
          const zonedDateTime = Temporal.ZonedDateTime.from(
            timestamp + "[UTC]"
          );
          const instant = Temporal.ZonedDateTime.from(zonedDateTime);
          const duration = instant.until(
            Temporal.Now.zonedDateTime(Temporal.Calendar.from("iso8601"))
          );
          const relativeString = duration.round("second").toLocaleString();

          return (
            <li key={id}>
              {book.title} - {book.author} ({relativeString} ago)
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default UserDetailPage;
