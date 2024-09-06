import { gql, useQuery } from "@apollo/client";
import { Query, User } from "./types";
import { Link } from "react-router-dom";

const USERS_FRAGMENT = gql`
  fragment UserParts on User {
    firstName
    lastName
    email
    isAdmin
    timestamp
    id
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

const UserListPage = () => {
  const { loading, error, data } = useQuery<{ users: Query<User>[] }>(
    USERS_QUERY
  );
  if (error) return <span>:(</span>;
  if (loading || !data) return <span>loading...</span>;

  const { users } = data;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>First</th>
            <th>Last</th>
            <th>Electronic Mail</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/user/${user.id}`}>{user.firstName}</Link>
              </td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserListPage;
