<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Services;

class FrontServiceController extends Controller
{
    public function index(){
        $service = Services::where('status',1)->orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $service
        ]);
    }

    public function latestServices(Request $request){
        $service = Services::where('status',1)
        ->take($request->get('limit'))
        ->orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $service
        ]);
    }
}
