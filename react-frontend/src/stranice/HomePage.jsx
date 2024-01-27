import React from 'react';

const HomePage = () => {

  return (
    <div className="container-sm d-flex align-items-center justify-content-center min-vh-100">
      <div className="text-center">
        <header className="mt-5">
          <h1 className="display-4">Sistem za Detekciju Plagijarizma</h1>
          <p className="lead mb-5">
            Dobrodošli na našu platformu namenjenu edukatorima i institucijama za osiguranje integriteta akademskih ocena.
          </p>
        </header>

        <section className="my-4">
          <div className="row">
            <div className="col-lg-4 offset-lg-2">
              <h2 className="font-weight-bold mb-5">Kako Funkcioniše</h2>
              <p className="text-justify">
                Naš sistem za detekciju plagijarizma koristi napredne algoritme za upoređivanje testova studenata sa obimnom bazom akademskog sadržaja.
                Korišćenjem najnovije tehnologije pružamo sveobuhvatnu analizu potencijalnih sličnosti, omogućavajući edukatorima da donose informisane odluke.
              </p>
            </div>
            <div className="col-lg-4">
              <img
                src="/čiča.jpg"
                alt="Detekcija Plagijarizma"
                className="img-fluid rounded"
                style={{ width: '400px', height: 'auto' }}
              />
            </div>
          </div>
        </section>
        <hr className='offset-lg-2 col-lg-8'/>
        <section className="my-4">
          <div className="row">
            <div className="col-lg-4 offset-lg-2">
              <img
                src="/katanac.jpg"
                alt="Sigurno i Pouzdano"
                className="img-fluid rounded"
                style={{ width: '400px', height: 'auto' }}
              />
            </div>
            <div className="col-lg-4">
              <h2 className="font-weight-bold mb-5">Sigurno i Pouzdano</h2>
              <p className="text-justify">
                Stavljamo bezbednost i privatnost vaših podataka na prvo mesto. Naš sistem garantuje da se svi radovi studenata i izveštaji o plagijarizmu obrađuju s najvećom poverljivošću.
                Budite sigurni da je integritet akademskog rada vaše institucije u bezbednim rukama.
              </p>
            </div>
          </div>
        </section>
        <hr className='offset-lg-2 col-lg-8'/>
        <section className="my-4">
          <div className="row">
            <div className="col-lg-4 offset-lg-2">
              <h2 className="font-weight-bold mb-5">Započnite Danas</h2>
              <p className="text-justify">
                Implementacija našeg sistema za detekciju plagijarizma je jednostavna. Prijavite se danas i osnažite vaše edukatore moćnim alatom za održavanje akademske iskrenosti.
              </p>
            </div>
            <div className="col-lg-4">
              <img
                src="fonovci.jpg"
                alt="Započnite Danas"
                className="img-fluid rounded"
                style={{ width: '400px', height: 'auto' }}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
