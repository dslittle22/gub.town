import { gql, useQuery } from "@apollo/client";
import type { User } from "./types";

const USERS_FRAGMENT = gql`
  fragment UserParts on User {
    firstName
    lastName
    email
    isAdmin
    timestamp
  }
`;

const USERS_QUERY = gql`
  ${USERS_FRAGMENT}
  query UsersQuery {
    users {
      ...UserParts
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery<{ users: User[] }>(USERS_QUERY, {
    fetchPolicy: "no-cache",
  });

  if (loading || !data) return <span>loading...</span>;
  if (error) return <span>:(</span>;

  const { users } = data;

  return (
    <table>
      {users.map((user) => (
        <tr>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
        </tr>
      ))}
    </table>
  );
}

export default App;
