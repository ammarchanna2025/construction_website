<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Testimonials;

class FrontTestimonialController extends Controller
{
    public function index(){
        $testimonial = Testimonials::where('status',1)->orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $testimonial
        ]);
    }

    public function latestTestimonials(Request $request){
        $testimonial = Testimonials::where('status',1)
        ->take($request->get('limit'))
        ->orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $testimonial
        ]);
    }
}
