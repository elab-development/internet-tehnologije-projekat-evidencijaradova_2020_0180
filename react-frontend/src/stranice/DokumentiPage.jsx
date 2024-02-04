import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Button from '../komponente/Button';

const DokumentiPage = () => {
  const [documents, setDocuments] = useState([]);
  const [updatingDocumentId, setUpdatingDocumentId] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({ filename: '', user_id: '' });
  const [currentPage, setCurrentPage] = useState(0);
  const [documentsPerPage] = useState(5);

  useEffect(() => {
    fetchDocuments(); // Fetch documents from API on component mount
  }, []);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        console.error('Access token not found in local storage');
        return;
      }

      const response = await axios.get('/api/documents', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setDocuments(response.data.documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('auth_token');
      await axios.put(`/api/documents/${updatingDocumentId}`, updateFormData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUpdatingDocumentId(null);
      setUpdateFormData({ filename: '', user_id: '' });
      fetchDocuments();
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handlePlagiarism = async (id) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        console.error('Access token not found in local storage');
        return;
      }

      const response = await axios.post(`/api/check-plagiarism/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      alert(`Procenat plagiarizma za dokument sa ID:${id} je ${response.data.plagPercent}% `);

      const updatedDocuments = documents.map((doc) => {
        if (doc.id === id) {
          return { ...doc, plagPercent: response.data.plagPercent };
        }
        return doc;
      });

      setDocuments(updatedDocuments);
    } catch (error) {
      console.error('Error checking plagiarism:', error);
    }
  };

  const handleDelete = async (documentId) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        console.error('Access token not found in local storage');
        return;
      }

      await axios.delete(`/api/documents/${documentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const indexOfLastDocument = (currentPage + 1) * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documents.slice(indexOfFirstDocument, indexOfLastDocument);

  return (
    <div className="col-11 mt-5">
      <h1 className="offset-3">Dokumenti</h1>
      <div className="row">
        <div className="col-md-7 offset-3">
          {updatingDocumentId ? (
            <form onSubmit={handleUpdateFormSubmit}>
              <input
                type="text"
                value={updateFormData.filename}
                onChange={(e) => setUpdateFormData({ ...updateFormData, filename: e.target.value })}
                placeholder="Filename"
              />
              <input
                type="text"
                value={updateFormData.user_id}
                onChange={(e) => setUpdateFormData({ ...updateFormData, user_id: e.target.value })}
                placeholder="User ID"
              />
              <Button type="submit" className="btn btn-primary">
                Pošalji
              </Button>
            </form>
          ) : (
            <div className='d-flex flex-column align-items-center'>
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th className="col-2">Dokument ID</th>
                    <th className="col-2">Naziv dokumenta</th>
                    <th className="col-2">Ime</th>
                    <th className="col-2">Proveri plagiarizam</th>
                    <th className="col-1">Obriši</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDocuments.map((document) => (
                    <tr key={document.id}>
                      <td className="align-middle">{document.id}</td>
                      <td className="align-middle">{document.filename}</td>
                      <td className="align-middle">{document.user}</td>
                      <td className="align-middle text-center">
                        <Button className="btn btn-warning py-1" onClick={() => handlePlagiarism(document.id)}>
                          Proveri
                        </Button>
                      </td>
                      <td className="align-middle text-center">
                        <Button className="btn btn-danger py-1" onClick={() => handleDelete(document.id)}>
                          Obriši
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={Math.ceil(documents.length / documentsPerPage)}
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

export default DokumentiPage;
