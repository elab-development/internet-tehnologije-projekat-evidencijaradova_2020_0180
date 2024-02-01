<?php

// database/seeders/UserSeeder.php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {

        User::create([
            'name' => 'Profesor',
            'email' => 'profesor@example.com',
            'password' => Hash::make('password'),
            'role' => 'professor',
        ]);

        // Students
        User::create([
            'name' => 'Ana Jovanović',
            'email' => 'ana.jovanovic@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        User::create([
            'name' => 'Marko Petrović',
            'email' => 'marko.petrovic@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        User::create([
            'name' => 'Jovana Nikolić',
            'email' => 'jovana.nikolic@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        User::create([
            'name' => 'Nikola Stojanović',
            'email' => 'nikola.stojanovic@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        User::create([
            'name' => 'Milica Đorđević',
            'email' => 'milica.djordjevic@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        User::create([
            'name' => 'Stefan Ristić',
            'email' => 'stefan.ristic@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        User::create([
            'name' => 'Marija Janković',
            'email' => 'marija.jankovic@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        User::create([
            'name' => 'Aleksa Pavlović',
            'email' => 'aleksa.pavlovic@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        User::create([
            'name' => 'Tamara Đorđević',
            'email' => 'tamara.djordjevic@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        User::create([
            'name' => 'Nemanja Milić',
            'email' => 'nemanja.milic@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        User::create([
            'name' => 'Katarina Simić',
            'email' => 'katarina.simic@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        User::create([
            'name' => 'Luka Todorović',
            'email' => 'luka.todorovic@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        User::create([
            'name' => 'Milena Vuković',
            'email' => 'milena.vukovic@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        User::create([
            'name' => 'Stefana Jovanović',
            'email' => 'stefana.jovanovic@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);
        
        User::create([
            'name' => 'Jovana Stojanović',
            'email' => 'jovana.stojanovic@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);
        
        User::create([
            'name' => 'Nikola Đukić',
            'email' => 'nikola.djukic@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);
        
        User::create([
            'name' => 'Teodora Nikolić',
            'email' => 'teodora.nikolic@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);
        
        User::create([
            'name' => 'Stefan Marković',
            'email' => 'stefan.markovic@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        User::create([
            'name' => 'Tamara Vasić',
            'email' => 'tamara.vasic@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);
    }
}
