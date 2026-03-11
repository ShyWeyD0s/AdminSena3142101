<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function index()
    {
        return Teacher::with(['area', 'training_center'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'area_id' => 'required|exists:areas,id',
            'training_center_id' => 'required|exists:training_centers,id',
        ]);

        $teacher = Teacher::create($validated);
        return response()->json($teacher, 201);
    }

    public function show(Teacher $teacher)
    {
        return $teacher->load(['area', 'training_center']);
    }

    public function update(Request $request, Teacher $teacher)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255',
            'area_id' => 'sometimes|required|exists:areas,id',
            'training_center_id' => 'sometimes|required|exists:training_centers,id',
        ]);

        $teacher->update($validated);
        return response()->json($teacher);
    }

    public function destroy(Teacher $teacher)
    {
        $teacher->delete();
        return response()->json(null, 204);
    }
}
