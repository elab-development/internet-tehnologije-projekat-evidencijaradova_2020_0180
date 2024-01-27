import './App.css';
import LoginPage from './stranice/LoginPage';
import RegisterPage from './stranice/RegisterPage';
import HomePage from './stranice/HomePage';
import ContactPage from './stranice/ContactPage';
import KorisniciPage from './stranice/KorisniciPage';
import NavBar from './komponente/NavBar';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = ({ initialToken }) => {
  const [token, setToken] = useState(initialToken);

  const addToken = (newToken) => {
    setToken(newToken);
    window.localStorage.setItem("auth_token", newToken);
  };

  const removeToken = () => {
    setToken(null);
    window.localStorage.removeItem("auth_token");
  };

  return (
    <div className="App">
      <BrowserRouter>
        {/* Pass the token and removeToken function to NavBar */}
        <NavBar token={token} removeToken={removeToken} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage addToken={addToken} />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/korisnici' element={<KorisniciPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
