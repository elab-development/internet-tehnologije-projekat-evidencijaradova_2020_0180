// Ovaj hook pruža mehanizam za izvršavanje API zahteva i praćenje njegovog stanja.

// `useState` se koristi za praćenje stanja podataka, grešaka i učitavanja.
// `data` sadrži podatke dobijene iz API odgovora, `error` sadrži grešku (ako postoji), a `loading` označava da li je zahtev u toku.
// Inicijalni podaci mogu biti prosleđeni kao argument hook-u.

import { useState } from 'react';

const useApiRequest = (initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const fetchData = async (apiFunction, ...args) => {
    try {
      setLoading(true);
      const response = await apiFunction(...args);
      setData(response.data);
      return null; // Indicates no error occurred
    } catch (err) {
      console.error('API Request Error:', err);
      if (err.response) {
        console.error('Server Response:', err.response);
      }
      return err; // Return the entire error object
    } finally {
      setLoading(false);
    }
  };
  
  
  
  

  return { data, loading, fetchData };
};

// Exportovanje hook-a kako bi bio dostupan u drugim delovima aplikacije
export default useApiRequest;
