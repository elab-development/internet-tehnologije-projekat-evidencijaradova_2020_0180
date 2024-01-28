import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextInput from '../komponente/TextInput';
import Button from '../komponente/Button';
import { UserContext } from "../komponente/UserContext";

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

  const { setUser } = useContext(UserContext);
  // Hook za navigaciju iz React Router-a
  let navigate = useNavigate();

  // Funkcija koja se poziva prilikom pokušaja prijave
  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("api/login", userData)
      .then((response) => {
        console.log(response.data);

        if (response.data.success === true) {
          window.localStorage.setItem("auth_token", response.data.access_token);
          addToken(response.data.access_token);

          // Update user context with authentication status and role
          setUser({
            isAuthenticated: true,
            role: response.data.role // Assuming role is in the response
          });

          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          // Handle specific response, e.g., invalid credentials, server error
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          // Handle network error
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
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
                  <Button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  >
                    Prijava
                  </Button>
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
