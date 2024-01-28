<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
        ]);
    
        // \App\Models\User::factory(10)->create();
        // \App\Models\Document::factory(10)->create();
        // \App\Models\Report::factory(10)->create();
    }
}
