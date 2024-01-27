import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextInput from '../komponente/TextInput';

// Komponenta za prijavljivanje korisnika
const LoginPage = ({ addToken }) => {
  // Stanje za čuvanje podataka o korisniku (email, šifra)
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // Funkcija za ažuriranje stanja na osnovu korisničkog unosa
  function handleInput(e) {
    let newUserData = { ...userData };
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
  }

  // Hook za navigaciju iz React Router-a
  let navigate = useNavigate();

  // Funkcija koja se poziva prilikom pokušaja prijave
  function handleLogin(e) {
    e.preventDefault();
    // Slanje HTTP POST zahteva ka serveru za prijavu korisnika
    axios
      .post("api/login", userData)
      .then((response) => {
        console.log(response.data);

        // Provera uspešnosti prijave
        if (response.data.success === true) {
          // Čuvanje autentikacionog tokena u lokalnom skladištu
          window.localStorage.setItem("auth_token", response.data.access_token);
          // Dodavanje tokena u stanje komponente iznad (prop 'addToken')
          addToken(response.data.access_token);
          // Navigacija na početnu stranicu
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section
      className="vh-100"
      style={{
        paddingTop: 4.5 + "rem",
      }}
    >
      <div className="container-fluid h-custom">
        <div className=" justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-4 offset-xl-4">
            <img
              src="/login.jpg"
              className="img-fluid"
              alt="Slika"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-4">
            <form onSubmit={handleLogin}>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="emailLogin"
                  className="form-control form-control-lg"
                  placeholder="Unesite svoju email adresu"
                  name="email"
                  onInput={(e) => handleInput(e)}
                />
              </div>

              {/* Komponenta za unos šifre */}
              <TextInput
                type="password"
                id="passwordLogin"
                placeholder="Šifra"
                name="password"
                onInput={(e) => handleInput(e)}
              />

              <div className="row justify-content-center">
                <div className="col-auto">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{
                      paddingLeft: 2.5 + 'rem',
                      paddingRight: 2.5 + 'rem',
                    }}
                  >
                    Prijava
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Nemate nalog?{' '}
                    <a href="/register" className="link-danger">
                      Registracija
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
