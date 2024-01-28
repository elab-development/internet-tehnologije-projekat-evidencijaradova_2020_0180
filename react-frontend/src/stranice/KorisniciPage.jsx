import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Button from '../komponente/Button';
const token = localStorage.getItem('auth_token');

const KorisniciPage = () => {
  const [users, setUsers] = useState([]);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({ name: '', email: '', password: '' });
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Retrieve the access token from local storage
      const token = localStorage.getItem('auth_token');

      if (!token) {
        // Handle the case where there is no token
        console.error('Access token not found in local storage');
        return;
      }

      // Include the token in the Authorization header
      const response = await axios.get('/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setUsers(response.data);
      console.log('Korisnici nakon dohvatanja:', response.data);
    } catch (error) {
      console.error('Greška prilikom dohvatanja korisnika:', error);
    }
  };

  // Funkcija za pripremu podataka za ažuriranje korisnika
  const handleUpdate = (userId) => {
    setUpdatingUserId(userId);
    const selectedUser = users.find(user => user.id === userId);
    setUpdateFormData({
      name: selectedUser.name,
      email: selectedUser.email,
    });
  };

  // Funkcija za obradu podataka kada se forma za ažuriranje pošalje
  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        console.error('Access token not found in local storage');
        return;
      }
  
      // Slanje HTTP PUT zahteva za ažuriranje korisnika
      await axios.put(`/api/update-user/${updatingUserId}`, {
        name: updateFormData.name,
        email: updateFormData.email,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      setUpdatingUserId(null);
      setUpdateFormData({ name: '', email: '' });
      // Ponovno dohvatanje korisnika nakon ažuriranja
      fetchUsers();
    } catch (error) {
      console.error('Greška prilikom ažuriranja korisnika:', error);
    }
  };
  

  // Funkcija za brisanje korisnika
  const handleDelete = async (userId) => {
    try {  
      await axios.delete(`/api/destroy-user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      fetchUsers();
    } catch (error) {
      console.error('Greška prilikom brisanja korisnika:', error);
    }
  };
  

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const indexOfLastUser = (currentPage + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Prikazivanje korisničkog interfejsa
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
