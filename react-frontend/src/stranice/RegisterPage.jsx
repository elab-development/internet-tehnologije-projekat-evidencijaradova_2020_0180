// Komponenta za stranicu registracije korisnika
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextInput from '../komponente/TextInput'; // Komponenta za unos teksta
import Button from '../komponente/Button'; // Komponenta za dugme
import useApiRequest from '../hooks/useApiRequest';

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { fetchData, loading, error } = useApiRequest(); // Destructuring needed values from the hook
  let navigate = useNavigate();

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Refactored handleRegister to use fetchData from useApiRequest
  const handleRegister = (e) => {
    e.preventDefault();
    fetchData(() => axios.post('api/register', userData))
      .then((data) => {
        // Assuming fetchData resolves with the data on success or null on failure
        if (data) {
          console.log('Registration successful:', data);
          navigate('/login');
        } else if (error) {
          console.error('Registration failed. Error:', error);
        }
      });
  };

  return (
    <section className="vh-100" style={{ paddingTop: '4.5rem' }}>
      <div className="container-fluid h-custom">
        <div className="justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-4 offset-xl-4">
            <img src="/register.jpg" className="img-fluid" alt="Slika" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-4">
            <form onSubmit={handleRegister}>
              <TextInput
                type="text"
                id="nameRegister"
                placeholder="Korisničko ime"
                name="username"
                onInput={handleInput}
              />
              <TextInput
                type="email"
                id="emailRegister"
                placeholder="Email"
                name="email"
                onInput={handleInput}
              />
              <TextInput
                type="password"
                id="passwordRegister"
                placeholder="Šifra"
                name="password"
                onInput={handleInput}
              />
              <div className="row justify-content-center">
                <div className="col-auto">
                  <Button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? 'Registracija u toku...' : 'Registracija'}
                  </Button>
                  {error && <p className="text-danger">Error: {error}</p>}
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Imate nalog? <a href="/login" className="link-danger">Prijava</a>
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