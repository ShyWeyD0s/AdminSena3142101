<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        return Course::with(['area', 'training_center'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_number' => 'required|string|max:255',
            'day' => 'required|string|max:255',
            'area_id' => 'required|exists:areas,id',
            'training_center_id' => 'required|exists:training_centers,id',
        ]);

        $course = Course::create($validated);
        return response()->json($course, 201);
    }

    public function show(Course $course)
    {
        return $course->load(['area', 'training_center']);
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'course_number' => 'sometimes|required|string|max:255',
            'day' => 'sometimes|required|string|max:255',
            'area_id' => 'sometimes|required|exists:areas,id',
            'training_center_id' => 'sometimes|required|exists:training_centers,id',
        ]);

        $course->update($validated);
        return response()->json($course);
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return response()->json(null, 204);
    }
}
