<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Members;

class FrontMemberController extends Controller
{
    public function index()
    {
        $members = Members::where('status', 1)->orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $members
        ]);
    }

    public function latestMembers(Request $request)
    {
        $members = Members::where('status', 1)
            ->take($request->get('limit', 4))
            ->orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $members
        ]);
    }
}
