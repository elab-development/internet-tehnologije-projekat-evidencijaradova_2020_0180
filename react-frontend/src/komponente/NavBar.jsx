import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import NavLink from "./NavLink";

const NavBar = ({ token, removeToken }) => {
  const [userRole, setUserRole] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (token) {
      axios
        .get("api/user", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setUserRole(response.data.role);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  function handleLogout(event) {
    event.preventDefault();

    var config = {
      method: "post",
      url: "api/logout",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("auth_token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        removeToken();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Evidencija Radova
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse show" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink to="/" text="Pocetna" />
            <NavLink to="/contact" text="Kontakt" />
            {token && <NavLink to="/files" text="Slanje fajlova" />}
            {token && userRole === "professor" && <NavLink to="/users" text="Korisnici" />}
            {token && userRole === "professor" && <NavLink to="/pregled-radova" text="Pregled Radova" />}
            {!token ? (
              location.pathname !== "/login" && (
                <a className="nav-link" href="/login">
                  Login
                </a>
              )
            ) : (
              <a className="nav-link" href="/" onClick={handleLogout}>
                Logout
              </a>
            )}
            {!token && location.pathname !== "/register" && (
              <a className="nav-link" href="/register">
                Register
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
