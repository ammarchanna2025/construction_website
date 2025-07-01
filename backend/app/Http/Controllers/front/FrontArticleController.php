<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Articles;

class FrontArticleController extends Controller
{
    public function index(){
        $article = Articles::where('status',1)->orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $article
        ]);
    }

    public function latestArticles(Request $request){
        $article = Articles::where('status',1)
        ->take($request->get('limit'))
        ->orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $article
        ]);
    }
}
