<?php

namespace App\Http\Controllers;

use App\Models\Computer;
use Illuminate\Http\Request;

class ComputerController extends Controller
{
    public function index()
    {
        return Computer::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'number' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
        ]);

        $computer = Computer::create($validated);
        return response()->json($computer, 201);
    }

    public function show(Computer $computer)
    {
        return $computer;
    }

    public function update(Request $request, Computer $computer)
    {
        $validated = $request->validate([
            'number' => 'sometimes|required|string|max:255',
            'brand' => 'sometimes|required|string|max:255',
        ]);

        $computer->update($validated);
        return response()->json($computer);
    }

    public function destroy(Computer $computer)
    {
        $computer->delete();
        return response()->json(null, 204);
    }
}
