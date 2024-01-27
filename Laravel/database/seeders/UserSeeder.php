<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Kreiranje 9 studenata
        for ($i = 1; $i <= 9; $i++) {
            User::create([
                'name' => "Student $i",
                'email' => "student$i@example.com",
                'password' => Hash::make('password'), // koristite sigurnu lozinku
                'role' => 'student'
            ]);
        }

        // Kreiranje 1 profesora
        User::create([
            'name' => 'Profesor',
            'email' => 'professor@example.com',
            'password' => Hash::make('password'), // koristite sigurnu lozinku
            'role' => 'professor'
        ]);
    }
}