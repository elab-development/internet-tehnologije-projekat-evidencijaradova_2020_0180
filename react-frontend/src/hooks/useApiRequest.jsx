// Ovaj hook pruža mehanizam za izvršavanje API zahteva i praćenje njegovog stanja.

// `useState` se koristi za praćenje stanja podataka, grešaka i učitavanja.
// `data` sadrži podatke dobijene iz API odgovora, `error` sadrži grešku (ako postoji), a `loading` označava da li je zahtev u toku.
// Inicijalni podaci mogu biti prosleđeni kao argument hook-u.

import { useState } from 'react';

const useApiRequest = (initialData = null) => {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (apiFunction, ...args) => {
    try {
      setLoading(true);
      setError(null); // Resetujte stanje greške pre slanja novog zahteva
      const response = await apiFunction(...args);

      // Provera da li odgovor sadrži očekivane podatke
      if (response && response.data) {
        setData(response.data); // Ažuriranje stanja sa podacima iz odgovora
        return response.data; // Vraćanje podataka za trenutnu upotrebu
      } else {
        throw new Error('Nisu primljeni podaci iz zahteva');
      }
    } catch (err) {
      setError(err); // Ažuriranje stanja greške sa uhvaćenom greškom
      console.error('Greška pri zahtevu ka API-ju:', err);
      // Pružanje detaljnijih informacija o grešci ako su dostupne
      if (err.response) {
        console.error('Odgovor sa servera:', err.response);
        return { error: err.response }; // Vraćanje detalja o grešci
      } else {
        return { error: err }; // Vraćanje opšte greške ako odgovor nije dostupan
      }
    } finally {
      setLoading(false); // Postavljanje stanja u "loading" na "false" nakon završetka
    }
  };

  return { data, error, loading, fetchData };
};

export default useApiRequest;
