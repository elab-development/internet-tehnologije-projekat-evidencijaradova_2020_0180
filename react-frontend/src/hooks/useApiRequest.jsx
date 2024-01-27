// Ovaj hook pruža mehanizam za izvršavanje API zahteva i praćenje njegovog stanja.

// `useState` se koristi za praćenje stanja podataka, grešaka i učitavanja.
// `data` sadrži podatke dobijene iz API odgovora, `error` sadrži grešku (ako postoji), a `loading` označava da li je zahtev u toku.
// Inicijalni podaci mogu biti prosleđeni kao argument hook-u.

import { useState } from 'react';

const useApiRequest = (initialData = null) => {
  // Stanje za praćenje podataka, grešaka i statusa učitavanja
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // fetchData funkcija se koristi za izvršavanje API zahteva
  const fetchData = async (apiFunction, ...args) => {
    try {
      // Postavljanje statusa učitavanja na true pre nego što se izvrši zahtev
      setLoading(true);
      
      // Izvršavanje API funkcije sa prosleđenim argumentima
      const response = await apiFunction(...args);
      
      // Postavljanje podataka na rezultat iz API odgovora
      setData(response.data);
    } catch (err) {
      // Ako se pojavi greška, postavljanje greške u odgovarajuće stanje
      setError(err);
    } finally {
      // Bez obzira na ishod, postavljanje statusa učitavanja na false nakon završetka zahteva
      setLoading(false);
    }
  };

  // Povratna vrednost hook-a, sadrži trenutne podatke, grešku, status učitavanja i funkciju za izvršavanje zahteva
  return { data, error, loading, fetchData };
};

// Exportovanje hook-a kako bi bio dostupan u drugim delovima aplikacije
export default useApiRequest;
