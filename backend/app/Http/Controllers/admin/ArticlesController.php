<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Articles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\TempImage;
use Illuminate\Support\Facades\File;

class ArticlesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $article = Articles::orderBy('created_at','DESC')->get();

        return response()->json([
            'status' => true,
            'data' => $article
        ]);
    }




    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->merge(['slug'=> Str::slug($request->slug)]);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:articles,slug'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error' => $validator->errors()
            ]);
        }

        // Create new project record
        $article = new Articles();
        $article->title = $request->title;
        $article->slug = Str::slug($request->slug);
        $article->content = $request->content;
        $article->author = $request->author;
        $article->status = $request->status;
        $article->save();

        if ($request->has('imageId') && $request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);

            if ($tempImage != null) {
                $fileName = $tempImage->name;

                // Save image name to the model
                $article->image = $fileName;
                $article->save();
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Image not found in TempImage table!'
                ]);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Article added successfully!'
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $article = Articles::find($id);

        if($article== null){
            return response()->json([
                'status' => false,
                'message' => 'Article is  not Found!'

            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $article
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->merge(['slug'=> Str::slug($request->slug)]);
        $article= Articles::find($id);

    if ($article == null) {
        return response()->json([
            'status' => false,
            'message' => 'Article not Found!'
        ]);
    }

    $validator = Validator::make($request->all(), [
        'title' => 'required',
        'slug' => 'required|unique:articles,slug,' . $id . ',id'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => false,
            'error' => $validator->errors()
        ]);
    }

    // Update articles details
        $article->title = $request->title;
        $article->slug = Str::slug($request->slug);
        $article->content = $request->content;
        $article->author = $request->author;
        $article->status = $request->status;
        $article->save();

    // Handle image update
    if ($request->imageId > 0) {
        $oldImage = $article->image;
        $tempImage = TempImage::find($request->imageId);

        if ($tempImage != null) {
            // Update  image
            $fileName = $tempImage->name;
            $article->image = $fileName;
            $article->save();

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
        'message' => 'Article Updated Successfully!'
    ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $article = Articles::find($id);

        if($article == null){
            return response()->json([
                'status' => false,
                'message' => 'Article not Found!'

            ]);
        }

        $article->delete();

        return response()->json([
            'status' => true,
            'message' => 'Article Deleted'
        ]);
    }
}
