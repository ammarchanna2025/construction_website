<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;

class FrontProjectController extends Controller
{
    public function index(){
        $project = Project::where('status',1)->orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $project
        ]);
    }

    public function latestProjects(Request $request){
        $project = Project::where('status',1)
        ->take($request->get('limit'))
        ->orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $project
        ]);
    }
}

