<?php

namespace App\Http\Controllers;

use App\Models\TrainingCenter;
use Illuminate\Http\Request;

class TrainingCenterController extends Controller
{
    public function index()
    {
        return TrainingCenter::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
        ]);

        $center = TrainingCenter::create($validated);
        return response()->json($center, 201);
    }

    public function show(TrainingCenter $trainingCenter)
    {
        return $trainingCenter;
    }

    public function update(Request $request, TrainingCenter $trainingCenter)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'location' => 'sometimes|required|string|max:255',
        ]);

        $trainingCenter->update($validated);
        return response()->json($trainingCenter);
    }

    public function destroy(TrainingCenter $trainingCenter)
    {
        $trainingCenter->delete();
        return response()->json(null, 204);
    }
}
