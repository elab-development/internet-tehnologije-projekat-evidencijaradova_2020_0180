// Stranica za upravljanje korisnicima u React aplikaciji
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate'; // Komponenta za paginaciju
import Button from '../komponente/Button'; // Komponenta za dugme
const token = localStorage.getItem('auth_token');

const KorisniciPage = () => {
  const [users, setUsers] = useState([]); // Stanje koje čuva listu korisnika
  const [updatingUserId, setUpdatingUserId] = useState(null); // ID korisnika koji se ažurira
  const [updateFormData, setUpdateFormData] = useState({ name: '', email: '', password: '' }); // Podaci forme za ažuriranje korisnika
  const [currentPage, setCurrentPage] = useState(0); // Trenutna stranica za paginaciju
  const [usersPerPage] = useState(5); // Broj korisnika po stranici

  useEffect(() => {
    fetchUsers(); // Poziva funkciju za dohvatanje korisnika pri montiranju komponente
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('auth_token'); // Pokušava dohvatiti token iz lokalnog skladišta
      if (!token) {
        console.error('Access token not found in local storage'); // Ako token nije pronađen, ispisuje grešku
        return;
      }

      const response = await axios.get('/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`, // Postavlja token u zaglavlje za autorizaciju
        },
      });

      setUsers(response.data); // Ažurira stanje sa listom dohvaćenih korisnika
      console.log('Korisnici nakon dohvatanja:', response.data);
    } catch (error) {
      console.error('Greška prilikom dohvatanja korisnika:', error); // Ispisuje grešku ako dohvat korisnika ne uspe
    }
  };

  // Funkcija za ažuriranje korisnika
  const handleUpdate = (userId) => {
    setUpdatingUserId(userId); // Postavlja ID korisnika koji se ažurira
    const selectedUser = users.find(user => user.id === userId); // Pronalazi korisnika po ID-u
    setUpdateFormData({ // Ažurira formu sa podacima izabranog korisnika
      name: selectedUser.name,
      email: selectedUser.email,
    });
  };

  // Obrada slanja forme za ažuriranje
  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault(); // Sprečava osvežavanje stranice
    try {
      if (!token) {
        console.error('Access token not found in local storage'); // Ako token nije pronađen, ispisuje grešku
        return;
      }
  
      await axios.put(`/api/update-user/${updatingUserId}`, updateFormData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Postavlja token u zaglavlje za autorizaciju
        },
      });
  
      setUpdatingUserId(null); // Resetuje ID korisnika koji se ažurira
      setUpdateFormData({ name: '', email: '' }); // Resetuje podatke forme
      fetchUsers(); // Osvežava listu korisnika
    } catch (error) {
      console.error('Greška prilikom ažuriranja korisnika:', error); // Ispisuje grešku ako ažuriranje ne uspe
    }
  };

  // Funkcija za brisanje korisnika
  const handleDelete = async (userId) => {
    try {  
      await axios.delete(`/api/destroy-user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Postavlja token u zaglavlje za autorizaciju
        },
      });
      fetchUsers(); // Osvežava listu korisnika nakon brisanja
    } catch (error) {
      console.error('Greška prilikom brisanja korisnika:', error); // Ispisuje grešku ako brisanje ne uspe
    }
  };

  // Rukovanje promenom stranice
  const handlePageClick = (event) => {
    setCurrentPage(event.selected); // Postavlja trenutnu stranicu na izabranu
  };

  // Izračunavanje indeksa za trenutnu stranicu
  const indexOfLastUser = (currentPage + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser); // Dohvata korisnike za trenutnu stranicu

  return (
    <div className="container mt-5">
      <h1 className="offset-3">Korisnici</h1>
      <div className="row">
        <div className="col-md-7 offset-3">
          {updatingUserId ? (
            // Forma za ažuriranje korisnika
            <form onSubmit={handleUpdateFormSubmit}>
              <input
                type="text"
                value={updateFormData.name}
                onChange={(e) => setUpdateFormData({ ...updateFormData, name: e.target.value })}
                placeholder="Ime"
              />
              <input
                type="text"
                value={updateFormData.email}
                onChange={(e) => setUpdateFormData({ ...updateFormData, email: e.target.value })}
                placeholder="Email"
              />
              <Button type="submit" className="btn btn-success py-1">
                Sačuvaj promene
              </Button>
            </form>
          ) : (
            // Tabela sa korisnicima
          <div className='d-flex flex-column align-items-center'>
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th className="col-1">ID</th>
                  <th className="col-4">Ime</th>
                  <th className="col-4">Email</th>
                  <th className="dugme">Ažuriraj</th>
                  <th className="dugme">Obriši</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="align-middle">{user.id}</td>
                    <td className="align-middle">{user.name}</td>
                    <td className="align-middle">{user.email}</td>
                    <td className="align-middle">
                    <Button className="btn btn-warning py-1" onClick={() => handleUpdate(user.id)}>
                      Ažuriraj
                    </Button>
                    </td>
                    <td className="align-middle">
                    <Button className="btn btn-danger py-1" onClick={() => handleDelete(user.id)}>
                      Obriši
                    </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReactPaginate
                previousLabel={'Prethodna'}
                nextLabel={'Sledeća'}
                breakLabel={'...'}
                pageCount={Math.ceil(users.length / usersPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KorisniciPage;
