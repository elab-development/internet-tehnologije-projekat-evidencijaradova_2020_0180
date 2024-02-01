## Evidencija Radova - ITEH projekat
## Početna podešavanja pre pokretanja projekta

## 1. Kloniranje repozitorijuma
git clone https://github.com/elab-development/internet-tehnologije-projekat-evidencijaradova_2020_0180

## 2. Ulazak u direktorijum projekta
cd internet-tehnologije-projekat-evidencijaradova_2020_0180

## 3. Instalacija Composera
cd laravel
composer install

## 3.1.U slucaju greske dozvoliti ekstenziju u php.ini fajlu, obrisati ; ispred ekstenzije
;extension=sodium => extension=sodium

## 4. Kopiranje .env konfiguracionog fajla
cp .env.example .env

## 5. Generisanje enktripcionih kljuceva
php artisan key:generate

## 9. Kreiranje prazne baze podataka za aplikaciju
Kreirajte praznu bazu podataka za projekat na phpmyadmin stranici sa imenom iz .env fajla

## 6. Migracija i popunjavanje baze podataka
php artisan migrate
php artisan db:seed

## 7. instalacija laravel/passport zavisnosti potrebne za autentifikaciju
php artisan passport:install

## 8. Instalacija NPM zavisnosti
cd ../react-frontend
npm install


## Dodatna podešavanja za pokretanja projekta

## 1. Pokrenuti laravel server iz laravel foldera
php artisan serve

## 2. Pokrenuti react server iz rect foldera
npm run start

