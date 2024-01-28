import React, { useState } from 'react';
import axios from 'axios';
import Button from '../komponente/Button';

// Komponenta za slanje fajlova
const SlanjeFajlova = ({ authToken }) => {
  // Stanje za čuvanje informacija o izabranom fajlu
  const [file, setFile] = useState(null);

  // Funkcija koja se poziva prilikom promene izabranog fajla
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Funkcija za slanje fajla na server
  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      axios.post('/api/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${authToken}`,
        },
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Error response:', error.response);
          console.log('Data:', error.response.data);
          console.log('Status:', error.response.status);
          console.log('Headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Error request:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', error.message);
        }
        console.error('Config:', error.config);
      });
    } else {
      console.error('No file selected for upload.');
    }
  };

  // Prikazivanje korisničkog interfejsa
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
                <a href='/'>Pošalji</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlanjeFajlova;
