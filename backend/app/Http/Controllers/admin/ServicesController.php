<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use App\Models\Services;
use App\Models\TempImage;
use Illuminate\Http\Request;
use App\Services\TempImageCleanupService;

class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Services::orderBy('created_at','DESC')->get();

        return response()->json([
            'status' => true,
            'data' => $services
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     $validator = Validator::make($request->all(),[
    //         'title' => 'required',
    //         'slug' => 'required|unique:services,slug'
    //     ]);

    //     if($validator->fails()){
    //         return response()->json([
    //             'status' => false,
    //             'error' => $validator->errors()
    //         ]);
    //     }

    //     $model = new Services();
    //     $model ->title = $request->title;
    //     $model ->short_desc = $request->short_desc;
    //     $model ->slug = Str::slug($request->slug);
    //     $model ->content = $request->content;
    //     $model ->status = $request->status;
    //     $model ->save();

    //     if ($request -> imageId > 0){

    //         $tempImage = TempImage::find($request -> imageId);
    //         if($tempImage != null){
    //             $fileName = $tempImage->name;
    //              $model->image = $fileName;
    //              $model->save();
    //         }


    //     }

    //     return response()->json([
    //         'status' => true,
    //         'message' => 'Service added Sucessfully!'

    //     ]);
    // }

    public function store(Request $request)
{
    // Validate request
    $validator = Validator::make($request->all(), [
        'title' => 'required',
        'slug' => 'required|unique:services,slug'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => false,
            'error' => $validator->errors()
        ]);
    }

    // Create new service record
    $model = new Services();
    $model->title = $request->title;
    $model->short_desc = $request->short_desc;
    $model->slug = Str::slug($request->slug);
    $model->content = $request->content;
    $model->status = $request->status;
    $model->save();

    // Check and assign image if imageId is provided
    if ($request->has('imageId') && $request->imageId > 0) {
        $tempImage = TempImage::find($request->imageId);

        if ($tempImage != null) {
            $fileName = $tempImage->name;
            $cleanupService = new TempImageCleanupService();

            // Move temp image to services folder
            if ($cleanupService->moveImageToPermanentLocation($tempImage, 'services', $fileName)) {
                // Save image name to the model
                $model->image = $fileName;
                $model->save();
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Failed to move image to permanent location!'
                ]);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Image not found in TempImage table!'
            ]);
        }
    }

    return response()->json([
        'status' => true,
        'message' => 'Service added successfully!'
    ]);
}


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $service = Services::find($id);

        if($service == null){
            return response()->json([
                'status' => false,
                'message' => 'Service not Found!'

            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $service
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Services $services)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, $id)
    // {
    //     $service = Services::find($id);

    //     if($service == null){
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Service not Found!'

    //         ]);


    //     }
    //     $validator = Validator::make($request->all(),[
    //         'title' => 'required',
    //         'slug' => 'required|unique:services,slug,'.$id.',id'
    //     ]);

    //     if($validator->fails()){
    //         return response()->json([
    //             'status' => false,
    //             'error' => $validator->errors()
    //         ]);
    //     }


    //     $service ->title = $request->title;
    //     $service ->short_desc = $request->short_desc;
    //     $service ->slug = Str::slug($request->slug);
    //     $service ->content = $request->content;
    //     $service ->status = $request->status;
    //     $service ->save();


    //     if ($request -> imageId > 0){
    //         $oldImage = $service->image;
    //         $tempImage = TempImage::find($request -> imageId);
    //         if($tempImage != null){
    //             $fileName = $tempImage->name;
    //             $service->image = $fileName;
    //             $service->save();

    //             if($oldImage != ''){
    //                 File::delete(public_path('uploads/thumb/'.$oldImage));
    //             }

    //         }


    //     }
    //     return response()->json([
    //         'status' => true,
    //         'message' => 'Service Updated Sucessfully!'

    //     ]);
    // }

    public function update(Request $request, $id)
{
    $service = Services::find($id);

    if ($service == null) {
        return response()->json([
            'status' => false,
            'message' => 'Service not Found!'
        ]);
    }

    $validator = Validator::make($request->all(), [
        'title' => 'required',
        'slug' => 'required|unique:services,slug,' . $id . ',id'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => false,
            'error' => $validator->errors()
        ]);
    }

    // Update service details
    $service->title = $request->title;
    $service->short_desc = $request->short_desc;
    $service->slug = Str::slug($request->slug);
    $service->content = $request->content;
    $service->status = $request->status;
    $service->save();

    // Handle image update
    if ($request->imageId > 0) {
        $oldImage = $service->image;
        $tempImage = TempImage::find($request->imageId);

        if ($tempImage != null) {
            $fileName = $tempImage->name;
            $cleanupService = new TempImageCleanupService();

            // Move temp image to services folder
            if ($cleanupService->moveImageToPermanentLocation($tempImage, 'services', $fileName)) {
                // Update service image
                $service->image = $fileName;
                $service->save();

                // Delete old image if it exists
                if ($oldImage != '') {
                    $oldImagePath = public_path('uploads/services/' . $oldImage);
                    if (File::exists($oldImagePath)) {
                        File::delete($oldImagePath);
                    }
                }
            }
        }
    }

    return response()->json([
        'status' => true,
        'message' => 'Service Updated Successfully!'
    ]);
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $service = Services::find($id);

        if($service == null){
            return response()->json([
                'status' => false,
                'message' => 'Service not Found!'

            ]);
        }

        $service->delete();

        return response()->json([
            'status' => true,
            'message' => 'Service Deleted'
        ]);
    }
}
