<?php

namespace App\Http\Controllers;

use App\Models\User;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        $users=User::all();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user=User::find($id);
        if(is_null($user)){
            return response()->json('Data not found', 404);
        }
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8',
        ]);
        $user=User::find($id);
        if(is_null($user)){
            return response()->json('Data not found', 404);
        }
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
        ]);

        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user=User::find($id);
        if(is_null($user)){
            return response()->json('Data not found', 404);
        }
        foreach ($user->dokumenti as $dokument) {
            $dokument->reportovi()->delete();
        }
        $user->dokumenti()->delete();
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    public function exportCsv()
    {
        $filename = "users.csv";
        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => "attachment; filename={$filename}",
        ];

        return response()->stream(function () {
            // Dodavanje UTF-8 BOM za Excel kompatibilnost
            echo "\xEF\xBB\xBF";

            $handle = fopen('php://output', 'w');
            // Definisanje kolona
            fputcsv($handle, ['ID', 'Name', 'Email', 'Ocena']);

            // Dohvatanje korisnika i dodavanje u CSV
            $users = User::all();
            foreach ($users as $user) {
                if ($user->role!='professor') {
                    fputcsv($handle, [$user->id, $user->name, $user->email]);
                }
            }

            fclose($handle);
        }, 200, $headers);
    }
}


