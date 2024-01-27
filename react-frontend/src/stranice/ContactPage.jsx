import React from 'react';

const ContactPage = () => {
  return (
    <div className="container">
      <header className="text-center mt-5">
        <h1 className="display-4">Kontaktirajte Nas</h1>
        <p className="lead">Obratite nam se za sva pitanja ili pomoć.</p>
      </header>

      <section className="my-5 text-left">
        <div className="row">
          <div className="col-lg-4 offset-lg-1">
            <h2 className="font-weight-bold">Naša Lokacija</h2>
            <p>
              Posetite nas na:
              <br />
              Jove Ilića 154, Beograd 11000
            </p>

            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Vaše Ime
                </label>
                <input type="text" className="form-control" id="name" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email adresa
                </label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Poruka
                </label>
                <textarea className="form-control" id="message" rows="4"></textarea>
              </div>
              <div className="row justify-content-center">
                <div className="col-auto">
                  <button type="submit" className="btn btn-primary">
                    Pošalji
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="col-lg-5">
            {/* Google Map Embed */}
            <iframe
              title="Google Mapa"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2820.2804972188237!2d20.485929515889267!3d44.77301398698417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a709fb8d329ed%3A0x18fcfa558d4d90b7!2sJove%20Ili%C4%87a%20154%2C%20Beograd%2011000!5e0!3m2!1sen!2srs!4v1646756607083!5m2!1sen!2srs"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
