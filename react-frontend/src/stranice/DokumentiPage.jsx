import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const DokumentiPage = () => {
  const [documents, setDocuments] = useState([]);
  const [updatingDocumentId, setUpdatingDocumentId] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({ filename: '', user_id: '' });
  const [currentPage, setCurrentPage] = useState(0);
  const [documentsPerPage] = useState(5);

  useEffect(() => {
    fetchDocuments();
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
  
      console.log('Response from server:', response.data);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };
  


  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/documents/${updatingDocumentId}`, {
        filename: updateFormData.filename,
        user_id: updateFormData.user_id,
      });
      setUpdatingDocumentId(null);
      setUpdateFormData({ filename: '', user_id: '' });
      fetchDocuments();
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const indexOfLastDocument = (currentPage + 1) * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = Array.isArray(documents) ? documents.slice(indexOfFirstDocument, indexOfLastDocument) : [];

  return (
    <div className="container mt-5">
      <h1 className="offset-1">Dokumenti</h1>
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
              <button type="submit" className="btn btn-success py-1">
                Save Changes
              </button>
            </form>
          ) : (
            <div className='d-flex flex-column align-items-center'>
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th className="col-1">ID</th>
                    <th className="col-4">Filename</th>
                    <th className="col-4">User ID</th>

                  </tr>
                </thead>
                <tbody>
                  {currentDocuments.map((document) => (
                    <tr key={document.id}>
                      <td className="align-middle">{document.id}</td>
                      <td className="align-middle">{document.filename}</td>
                      <td className="align-middle">{document.user_id}</td>

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
