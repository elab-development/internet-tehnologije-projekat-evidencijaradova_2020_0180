// Komponenta za slanje fajlova na server
import React, { useState } from 'react';
import axios from 'axios';
import Button from '../komponente/Button'; 
import { useNavigate } from 'react-router-dom'; 

const SlanjeFajlova = ({ authToken }) => {
  const [file, setFile] = useState(null); // Stanje za čuvanje izabranog fajla

  // Funkcija koja se poziva kada korisnik izabere fajl
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Postavljanje izabranog fajla u stanje
  };
  
  let navigate = useNavigate(); // Instanciranje useNavigate za kasniju navigaciju

  // Funkcija za slanje fajla na server
  const handleUpload = () => {
    if (file) { // Provera da li je fajl izabran
      const formData = new FormData(); // Kreiranje FormData objekta za slanje fajla
      formData.append('file', file); // Dodavanje fajla u FormData

      // Slanje POST zahteva na server sa fajlom i zaglavljem za autorizaciju
      axios.post('/api/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Postavljanje Content-Type u multipart/form-data
          'Authorization': `Bearer ${authToken}`, // Dodavanje tokena za autorizaciju
        },
      })
      .then(response => {
        console.log(response.data); // Logovanje odgovora servera
      })
      .catch(error => {
        // Obrada mogućih grešaka
        if (error.response) {
          console.error('Error response:', error.response); // Logovanje detalja o grešci
          console.log('Data:', error.response.data);
          console.log('Status:', error.response.status);
          console.log('Headers:', error.response.headers);
        } else if (error.request) {
          console.error('Error request:', error.request); // Logovanje greške u zahtevu
        } else {
          console.error('Error message:', error.message); // Logovanje poruke greške
        }
        console.error('Config:', error.config); // Logovanje konfiguracije zahteva
      });
    } else {
      console.error('No file selected for upload.'); // Logovanje ukoliko fajl nije izabran
    }
    navigate("/"); // Navigacija na početnu stranicu nakon slanja fajla
  };


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-4">
          <img
            src="/upload.png"
            className="img-fluid mb-4"
            alt="Slika"
          />
          <div className="mb-3">
            {/* Input polje za izbor fajla */}
            <label htmlFor="fileInput" className="form-label">Izaberite fajl</label>
            <input
              type="file"
              className="form-control"
              id="fileInput"
              onChange={handleFileChange}
            />
          </div>
          <div className="row justify-content-center">
            <div className="col-auto">
              <Button className="btn btn-primary" onClick={handleUpload}>
                <p className='m-0'>Pošalji</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlanjeFajlova;
