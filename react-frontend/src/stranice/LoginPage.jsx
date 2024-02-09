// Komponenta za stranicu prijave korisnika
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextInput from "../komponente/TextInput"; // Komponenta za unos teksta
import Button from "../komponente/Button"; // Komponenta za dugme
import useApiRequest from "../hooks/useApiRequest";

const LoginPage = ({ addToken }) => {
  // Stanje koje čuva korisničke podatke (email i šifra)
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // Funkcija za ažuriranje stanja korisničkih podataka na osnovu unosa
  function handleInput(e) {
    let newUserData = { ...userData }; // Kopira trenutno stanje korisničkih podataka
    newUserData[e.target.name] = e.target.value; // Ažurira vrednost za uneto polje
    setUserData(newUserData); // Postavlja novo stanje sa ažuriranim podacima
  }

  // Hook za navigaciju
  let navigate = useNavigate();
  // useApiRequest hook
  const { fetchData } = useApiRequest();

  // Funkcija koja se poziva prilikom slanja forme za prijavu
  async function handleLogin(e) {
    e.preventDefault(); // Sprečava podrazumevano ponašanje forme

    const response = await fetchData(() => axios.post("api/login", userData)); // Poziva API za prijavu korisnika
  
    if (response && response.success) {
      const { access_token: token } = response; // Destructuring za izvlačenje tokena iz odgovora
  
      if (token) {
        window.localStorage.setItem("auth_token", token); // Čuva token u lokalnom skladištu
        addToken(token); // Prosleđuje token u stanje aplikacije
        navigate("/"); // Navigacija na početnu stranu
      } else {
        console.error("Prijava nije uspela: Nedostaje token u odgovoru.");
      }
    } else {
      console.error("Neočekivana struktura odgovora ili neuspešan poziv API-ja:", response);
    }
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
            <img src="/login.jpg" className="img-fluid" alt="Slika" />
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
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Prijava
                  </Button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Nemate nalog?{" "}
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
