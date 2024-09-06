import { Outlet } from "react-router-dom";
import "./style.css";

function Root() {
  return (
    <>
      <h1>gub.land</h1>
      <div className="well">
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default Root;
