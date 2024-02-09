// Komponenta navigacione trake koja prikazuje linkove zavisno od uloge korisnika i statusa prijave
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import NavLink from "./NavLink";

const NavBar = ({ token, removeToken }) => {
  const [userRole, setUserRole] = useState(""); // Stanje za čuvanje uloge korisnika
  const location = useLocation(); // Hook za pristup trenutnoj lokaciji/ruti

  // Efekat za dohvatanje uloge korisnika kada se promeni token
  useEffect(() => {
    if (token) {
      axios
        .get("api/user", {
          headers: {
            Authorization: "Bearer " + token, // Postavljanje zaglavlja za autorizaciju
          },
        })
        .then((response) => {
          setUserRole(response.data.role); // Ažuriranje uloge korisnika
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  // Funkcija za odjavljivanje korisnika
  function handleLogout(event) {
    event.preventDefault();

    var config = {
      method: "post",
      url: "api/logout",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("auth_token"), // Postavljanje zaglavlja za autorizaciju
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        removeToken(); // Brisanje tokena iz stanja
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Prikazivanje navigacione trake sa linkovima koji zavise od uloge korisnika i statusa prijave
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
            {token && userRole === "professor" && <NavLink to="/users" text="Studenti" />}
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
