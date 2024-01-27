import './App.css';
import LoginPage from './stranice/LoginPage';
import RegisterPage from './stranice/RegisterPage';
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
        <NavBar token={token} removeToken={removeToken} />
        <Routes>
          <Route path='/login' element={<LoginPage addToken={addToken} />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
