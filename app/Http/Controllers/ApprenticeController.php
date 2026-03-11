<?php

namespace App\Http\Controllers;

use App\Models\Apprentice;
use Illuminate\Http\Request;

class ApprenticeController extends Controller
{
    public function index()
    {
        return Apprentice::with(['course', 'computer'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'cell_number' => 'required|string|max:20',
            'course_id' => 'required|exists:courses,id',
            'computer_id' => 'required|exists:computers,id',
        ]);

        $apprentice = Apprentice::create($validated);
        return response()->json($apprentice, 201);
    }

    public function show(Apprentice $apprentice)
    {
        return $apprentice->load(['course', 'computer']);
    }

    public function update(Request $request, Apprentice $apprentice)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255',
            'cell_number' => 'sometimes|required|string|max:20',
            'course_id' => 'sometimes|required|exists:courses,id',
            'computer_id' => 'sometimes|required|exists:computers,id',
        ]);

        $apprentice->update($validated);
        return response()->json($apprentice);
    }

    public function destroy(Apprentice $apprentice)
    {
        $apprentice->delete();
        return response()->json(null, 204);
    }
}
