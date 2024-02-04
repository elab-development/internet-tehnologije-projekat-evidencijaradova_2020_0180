<?php

namespace Database\Seeders;

use App\Models\Document;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 10; $i++) {

            $filename = time() . '_' . 'fajl_broj_'. $i . '.txt';
            $content = "Ovo je sadržaj dokumenta broj $i.";

            $path = 'uploads/' . $filename;

            Storage::disk('public')->put($path, $content);

            Document::create([
                'filename' => $filename,
                'user_id' => $i+1,
            ]);
        }
    }
}
