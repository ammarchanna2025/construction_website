<?php

namespace App\Http\Controllers\admin;

use App\Models\TempImage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\TempImageCleanupService;


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
                'message' => 'Image Uploaded'
            ]);

    }

    /**
     * Clean up old temporary images
     */
    public function cleanup(Request $request)
    {
        $hours = $request->get('hours', 24);
        $complete = $request->get('complete', false);

        $cleanupService = new TempImageCleanupService();

        if ($complete) {
            $results = $cleanupService->performCompleteCleanup($hours);

            return response()->json([
                'status' => true,
                'message' => 'Complete cleanup performed successfully',
                'data' => $results
            ]);
        } else {
            $result = $cleanupService->cleanupOldImages($hours);

            return response()->json([
                'status' => true,
                'message' => "Cleaned up images older than {$hours} hours",
                'data' => $result
            ]);
        }
    }
}
