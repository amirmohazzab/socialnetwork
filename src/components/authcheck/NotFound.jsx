import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./auth.css";
const NotFound = () => {
  const { userId } = useContext(AuthContext);
  return (
    <div className="not-view is-flex is-align-items-center is-justify-content-center">
      <div className="container">
        <div className="column has-text-centered">
          {userId ? (
            <>
              <h1 className="has-text-white has-text-centered is-size-2 is-fullwidth">
                Not Found
              </h1>
              <Link to="/" className="button is-success large is-size-5 mt-6">
                 go to Main page
              </Link>
            </>
          ) : (
            <>
              <h1 className="has-text-white has-text-centered is-size-2 is-fullwidth">
                 Login
              </h1>
              <Link
                to="/login"
                className="button is-success large is-size-5 mt-6"
              >
                Account
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound
