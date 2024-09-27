import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root.tsx";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorNotFound from "./error-notfound.tsx";
import UserDetailPage from "./Components/UserDetailPage.tsx";
import UserListPage from "./Components/UserListPage.tsx";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorNotFound />,
    children: [
      {
        path: "",
        element: <UserListPage />,
      },
      {
        path: "user/:userId",
        element: <UserDetailPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
