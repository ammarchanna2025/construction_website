<?php

namespace App\Http\Controllers\admin;

use App\Models\TempImage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class TempImageController extends Controller
{
    public function store(Request $request){

        $validator = Validator::make($request->all(),[
            'image' => 'required|mimes:png,jpg,jpeg,gif'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors('image')
            ]);
        }

        $image = $request -> image;

        $ext = $image->getClientOriginalExtension();
            $imageName = strtotime('now').'.'.$ext;

            $model = new TempImage();
            $model->name = $imageName;
            $model->save();




            $image->move(public_path('uploads/temp'),$imageName);

            return response()->json([
                'status' => true,
                'data' => $model,
                'message' => 'Image Uplaoded'
            ]);

    }
}
