<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ReportController extends Controller
{
    public function checkPlagiarism($filename)
    {
        $apiKey = '86edd31ad1bc4fcd2f6561f8b6f2cc0e';
        $strings=DocumentController::file_u_tekst($filename);
        $dokument=Document::where('filemame',$filename)->first();
        $plagPercentSum=0;
        $paraphrasePercentSum=0;
        $broj_elemenata=count($strings);
        foreach ($strings as $text) {
            try {
                $response = Http::post('https://www.prepostseo.com/apis/checkPlag', [
                    'key' => $apiKey,
                    'data' => $text
                ]);
    
                $result = json_decode($response->getBody(), true);

                $plagPercentSum += $result->plagPercent;
                $paraphrasePercentSum+= $result->paraphrasePercent;
                
            } catch (\Exception $e) {

                $results[] = ['error' => $e->getMessage()];
            }
        }
        $rez1=$plagPercentSum/$broj_elemenata;
        $rez2=$paraphrasePercentSum/$broj_elemenata;

        Report::create([
            'plagPercent'=>$rez1,
            'document_id'=>$dokument->id,
            'paraphrasePercent'=>$rez2
        ]);
        return response()->json([
            'plagPercent'=>$rez1,
            'paraphrasePercent'=>$rez2
        ]);
    }
}
