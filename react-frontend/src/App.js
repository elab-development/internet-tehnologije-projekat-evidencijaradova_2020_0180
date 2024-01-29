import './App.css';
import LoginPage from './stranice/LoginPage';
import RegisterPage from './stranice/RegisterPage';
import HomePage from './stranice/HomePage';
import ContactPage from './stranice/ContactPage';
import KorisniciPage from './stranice/KorisniciPage';
import SlanjeFajlova from './stranice/SlanjeFajlova';
import DokumentiPage from './stranice/DokumentiPage';
import NavBar from './komponente/NavBar';
import { UserProvider } from './komponente/UserContext';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './komponente/ProtectedRoute';
import FilesProtectedRoute from './komponente/FilesProtectedRoute';

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
      <UserProvider>
        <BrowserRouter>
          <NavBar token={token} removeToken={removeToken} />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage addToken={addToken} />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/users' element={<ProtectedRoute><KorisniciPage authToken={token}/></ProtectedRoute>} />
            <Route path='/files' element={<FilesProtectedRoute><SlanjeFajlova authToken={token} /></FilesProtectedRoute>} />
            <Route path='/pregled-radova' element={<ProtectedRoute><DokumentiPage authToken={token} /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
