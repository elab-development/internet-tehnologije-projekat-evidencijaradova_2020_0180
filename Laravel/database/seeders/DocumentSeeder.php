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
        $filename0 = time() . '_' . 'fajl_broj_01' . '.txt';
        $content0 = "These violent delights have violent ends
        And in their triumph die, like fire and powder,
        Which as they kiss consume. The sweetest honey
        Is loathsome in his own deliciousness
        And in the taste confounds the appetite.
        Therefore love moderately; long love doth so;
        Too swift arrives as tardy as too slow.";

        $path0 = 'uploads/' . $filename0;

        Storage::disk('public')->put($path0, $content0);

        Document::create([
            'filename' => $filename0,
            'user_id' => 1,
        ]);

        $filename0 = time() . '_' . 'fajl_broj_02' . '.txt';
        $content0 = "These violent delights have violent ends
        And in their triumph die, like fire and powder,
        Which as they kiss consume. The sweetest honey
        Is loathsome in his own deliciousness
        And in the taste confounds the appetite.
        Therefore love moderately; long love doth so;
        Too swift arrives as tardy as too slow.
        Ovo je neki random tekst koji nije plagijat
        Ovo je neki random tekst koji nije plagijat
        Ovo je neki random tekst koji nije plagijat
        Ovo je neki random tekst koji nije plagijat";

        $path0 = 'uploads/' . $filename0;

        Storage::disk('public')->put($path0, $content0);

        Document::create([
            'filename' => $filename0,
            'user_id' => 1,
        ]);

        for ($i = 1; $i < 11; $i++) {

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