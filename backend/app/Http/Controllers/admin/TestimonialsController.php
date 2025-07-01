<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonials;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\TempImage;
use Illuminate\Support\Facades\File;


class TestimonialsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $testimonial = Testimonials::orderBy('created_at','DESC')->get();



        return response()->json([
            'status' => true,
            'data' => $testimonial
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'testimonial' => 'required',
            'citation' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error' => $validator->errors()
            ]);
        }

        // Create new project record
        $testimonial = new Testimonials();
        $testimonial->title = $request->title;
        $testimonial->testimonial = $request->testimonial;
        $testimonial->citation = $request->citation;
        $testimonial->status = $request->status;
        $testimonial->save();

        if ($request->has('imageId') && $request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);

            if ($tempImage != null) {
                $fileName = $tempImage->name;

                // Save image name to the model
                $testimonial->image = $fileName;
                $testimonial->save();
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Image not found in TempImage table!'
                ]);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Testimonial added successfully!'
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $testimonial = Testimonials::find($id);

        if($testimonial== null){
            return response()->json([
                'status' => false,
                'message' => 'Testimonial is  not Found!'

            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $testimonial
        ]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $testimonial = Testimonials::find($id);

        if($testimonial== null){
            return response()->json([
                'status' => false,
                'message' => 'Testimonial is  not Found!'

            ]);
        }

        $validator = Validator::make($request->all(), [
            'testimonial' => 'required',
            'citation' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error' => $validator->errors()
            ]);
        }

        $testimonial->title = $request->title;
        $testimonial->testimonial = $request->testimonial;
        $testimonial->citation = $request->citation;
        $testimonial->status = $request->status;
        $testimonial->save();

        if ($request->imageId > 0) {
            $oldImage = $testimonial->image;
            $tempImage = TempImage::find($request->imageId);

            if ($tempImage != null) {
                // Update  image
                $fileName = $tempImage->name;
                $testimonial->image = $fileName;
                $testimonial->save();

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
            'message' => 'Testimonial Updated Successfully!'
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $testimonial = Testimonials::find($id);

        if($testimonial== null){
            return response()->json([
                'status' => false,
                'message' => 'Testimonial is  not Found!'

            ]);
        }

        $testimonial->delete();

        return response()->json([
            'status' => true,
            'message' => 'Testimonial is Deleted!'
        ]);
    }
}
