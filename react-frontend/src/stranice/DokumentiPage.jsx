// Stranica za prikaz i upravljanje dokumentima sa mogućnošću provere plagiarizma
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate"; // Komponenta za paginaciju
import Button from "../komponente/Button"; // Dugme komponenta

const DokumentiPage = () => {
  const [documents, setDocuments] = useState([]); // Stanje za čuvanje dokumenata
  const [currentPage, setCurrentPage] = useState(0); // Trenutna stranica za paginaciju
  const [documentsPerPage] = useState(5); // Dokumenata po stranici

  useEffect(() => {
    fetchDocuments(); // Dohvatanje dokumenata sa API-a
  }, []);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        console.error("Access token not found in local storage");
        return;
      }

      const response = await axios.get("/api/documents", {
        headers: {
          Authorization: `Bearer ${token}`, // Autorizacija za pristup API-u
        },
      });

      setDocuments(response.data.documents); // Ažuriranje stanja dokumenata
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handlePlagiarism = async (id) => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        console.error("Access token not found in local storage");
        return;
      }

      const response = await axios.post(
        `/api/check-plagiarism/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Autorizacija za proveru plagiarizma
          },
        }
      );

      alert(
        `Procenat plagiarizma za dokument sa ID: ${id} je ${response.data.plagPercent}% `
      );
    } catch (error) {
      console.error("Error checking plagiarism:", error);
    }
  };

  const handleDelete = async (documentId) => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        console.error("Access token not found in local storage");
        return;
      }

      await axios.delete(`/api/documents/${documentId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Autorizacija za brisanje dokumenta
        },
      });

      fetchDocuments(); // Osvežavanje liste dokumenata nakon brisanja
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  // Izračunavanje indeksa poslednjeg dokumenta na trenutnoj stranici. 
  // Ovo se postiže množenjem trenutne stranice (koju povećavamo za 1 jer indeksiranje stranica počinje od 0) sa brojem dokumenata po stranici.
  const indexOfLastDocument = (currentPage + 1) * documentsPerPage;
  // Izračunavanje indeksa prvog dokumenta na trenutnoj stranici. 
  // Ovo se postiže oduzimanjem broja dokumenata po stranici od indeksa poslednjeg dokumenta.
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  // Dobijanje niza dokumenata koji treba da budu prikazani na trenutnoj stranici. 
  // Ovo se postiže korišćenjem metode `slice` za izdvajanje segmenta niza `documents` koji počinje od `indexOfFirstDocument` i završava se na `indexOfLastDocument`, 
  // ali bez uključivanja dokumenta na poziciji `indexOfLastDocument`.
  const currentDocuments = documents.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  return (
    <div className="col-11 mt-5">
      <h1 className="offset-3">Dokumenti</h1>
      <div className="row">
        <div className="col-md-7 offset-3">
          <div className="d-flex flex-column align-items-center">
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th className="col-2">Dokument ID</th>
                  <th className="col-2">Naziv dokumenta</th>
                  <th className="col-2">Student</th>
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
                      <Button
                        className="btn btn-warning py-1"
                        onClick={() => handlePlagiarism(document.id)}
                      >
                        Proveri
                      </Button>
                    </td>
                    <td className="align-middle text-center">
                      <Button
                        className="btn btn-danger py-1"
                        onClick={() => handleDelete(document.id)}
                      >
                        Obriši
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={Math.ceil(documents.length / documentsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DokumentiPage;