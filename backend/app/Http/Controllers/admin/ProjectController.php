<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\Project;
use App\Models\TempImage;
use Illuminate\Support\Facades\File;

class ProjectController extends Controller
{

    public function index(){

        $project = Project::orderBy('created_at','DESC')->get();

        return response()->json([
            'status' => true,
            'data' => $project
        ]);
    }

    public function store(Request $request){

        $request->merge(['slug'=> Str::slug($request->slug)]);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:projects,slug'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error' => $validator->errors()
            ]);
        }

        // Create new project record
        $project = new Project();
        $project->title = $request->title;
        $project->short_desc = $request->short_desc;
        $project->slug = Str::slug($request->slug);
        $project->content = $request->content;
        $project->construction_type = $request->construction_type;
        $project->sector = $request->sector;
        $project->location = $request->location;
        $project->status = $request->status;
        $project->save();

        if ($request->has('imageId') && $request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);

            if ($tempImage != null) {
                $fileName = $tempImage->name;

                // Save image name to the model
                $project->image = $fileName;
                $project->save();
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Image not found in TempImage table!'
                ]);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Project added successfully!'
        ]);

    }

    public function show($id)
    {
        $project = Project::find($id);

        if($project== null){
            return response()->json([
                'status' => false,
                'message' => 'Project is  not Found!'

            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $project
        ]);
    }

    public function update(Request $request, $id)
{
    $request->merge(['slug'=> Str::slug($request->slug)]);
    $project= Project::find($id);

    if ($project == null) {
        return response()->json([
            'status' => false,
            'message' => 'Project not Found!'
        ]);
    }

    $validator = Validator::make($request->all(), [
        'title' => 'required',
        'slug' => 'required|unique:projects,slug,' . $id . ',id'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => false,
            'error' => $validator->errors()
        ]);
    }

    // Update project details
        $project->title = $request->title;
        $project->short_desc = $request->short_desc;
        $project->slug = Str::slug($request->slug);
        $project->content = $request->content;
        $project->construction_type = $request->construction_type;
        $project->sector = $request->sector;
        $project->location = $request->location;
        $project->status = $request->status;
        $project->save();

    // Handle image update
    if ($request->imageId > 0) {
        $oldImage = $project->image;
        $tempImage = TempImage::find($request->imageId);

        if ($tempImage != null) {
            // Update service image
            $fileName = $tempImage->name;
            $project->image = $fileName;
            $project->save();

            // Delete old image if it exists
            if ($oldImage != '') {
                $oldImagePath = public_path('uploads/temp/' . $oldImage);
                if (File::exists($oldImagePath)) {
                    File::delete($oldImagePath);
                }
            }
        }
    }

    return response()->json([
        'status' => true,
        'message' => 'Project Updated Successfully!'
    ]);
}

public function destroy($id)
    {
        $project = Project::find($id);

        if($service == null){
            return response()->json([
                'status' => false,
                'message' => 'Project not Found!'

            ]);
        }

        $project->delete();

        return response()->json([
            'status' => true,
            'message' => 'Project Deleted'
        ]);
    }
}

