import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextInput from '../komponente/TextInput';
import useApiRequest from '../hooks/useApiRequest';
// Komponenta za registraciju korisnika
const RegisterPage = () => {
  // Stanje za čuvanje podataka o korisniku (korisničko ime, email, šifra)
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Custom hook za upravljanje API pozivima
  const { data, error, loading, fetchData } = useApiRequest();

  // Funkcija za ažuriranje stanja na osnovu korisničkog unosa
  const handleInput = (e) => {
    let newUserData = { ...userData }; // Koristi operator širenja za kreiranje novog objekta
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
  };

  // Hook za navigaciju iz React Router-a
  let navigate = useNavigate();

  // Funkcija koja se poziva prilikom pokušaja registracije
  const handleRegister = async (e) => {
    e.preventDefault();

    // Pozivamo fetchData funkciju koja će obaviti API poziv
    await fetchData(axios.post, 'api/register', userData);

    // Provera da li je registracija uspešna
    if (!error && data) {
      console.log(data);
      // Nakon uspešne registracije, preusmeravanje na stranicu za prijavu
      navigate('/login');
    } else {
      console.log(error);
    }
  };

  return (
    <section
      className="vh-100"
      style={{
        paddingTop: 4.5 + 'rem',
      }}
    >
      <div className="container-fluid h-custom">
        <div className=" justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-4 offset-xl-4">
            <img
              src="/register.jpg"
              className="img-fluid"
              alt="Slika"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-4">
            <form onSubmit={handleRegister}>
              {/* Komponenta za unos korisničkog imena */}
              <TextInput
                type="text"
                id="nameRegister"
                placeholder="Korisničko ime"
                name="username"
                onInput={(e) => handleInput(e)}
              />

              {/* Komponenta za unos email adrese */}
              <TextInput
                type="email"
                id="emailRegister"
                placeholder="Email"
                name="email"
                onInput={(e) => handleInput(e)}
              />

              {/* Komponenta za unos šifre */}
              <TextInput
                type="password"
                id="passwordRegister"
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
                    disabled={loading}  // Onemogućiti dugme dok traje API poziv
                  >
                    {loading ? 'Registracija u toku...' : 'Registracija'}
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Imate nalog?{' '}
                    <a href="/login" className="link-danger">
                      Prijava
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

export default RegisterPage;
