import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { gql, useLazyQuery, useQuery } from "@apollo/client";

const FOO_DATA_QUERY = gql`
  query AcquireFooData {
    foo {
      foo
    }
  }
`;

function App() {
  const [count, setCount] = useState(0);

  const [runQuery, { loading, error, data }] = useLazyQuery(FOO_DATA_QUERY, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (count >= 3) {
      runQuery();
    }
  }, [count, runQuery]);

  console.log({ loading, error, data });

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + Apollo</h1>
      <div className="card">
        <button onClick={() => setCount(count + 1)}>count is {count}</button>
        {loading && <p>Loading...</p>}
        {error && <p>Error :(</p>}
        {data && (
          <>
            <p>Random number is {Number(data.foo[0].foo)}</p>
            <p>Sum is {Number(data.foo[0].foo) + count}</p>
          </>
        )}
        {/* {data && <p>Sum is {data + count}</p>} */}

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
