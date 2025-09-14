<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Members;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class MembersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $members = Members::orderBy('created_at', 'DESC')->get();

        return response()->json([
            'status' => true,
            'data' => $members
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'bio' => 'nullable|string',
            'linkedin' => 'nullable|url',
            'twitter' => 'nullable|url',
            'status' => 'required|integer|in:0,1'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        // Create new member record
        $member = new Members();
        $member->name = $request->name;
        $member->designation = $request->designation;
        $member->email = $request->email;
        $member->phone = $request->phone;
        $member->bio = $request->bio;
        $member->linkedin = $request->linkedin;
        $member->twitter = $request->twitter;
        $member->status = $request->status;
        $member->save();

        // Handle image upload if provided
        if ($request->has('imageId') && $request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);

            if ($tempImage != null) {
                $fileName = $tempImage->name;
                $member->image = $fileName;
                $member->save();
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Image not found in TempImage table!'
                ]);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Member added successfully!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $member = Members::find($id);

        if ($member == null) {
            return response()->json([
                'status' => false,
                'message' => 'Member not found!'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $member
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $member = Members::find($id);

        if ($member == null) {
            return response()->json([
                'status' => false,
                'message' => 'Member not found!'
            ]);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'bio' => 'nullable|string',
            'linkedin' => 'nullable|url',
            'twitter' => 'nullable|url',
            'status' => 'required|integer|in:0,1'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        // Update member record
        $member->name = $request->name;
        $member->designation = $request->designation;
        $member->email = $request->email;
        $member->phone = $request->phone;
        $member->bio = $request->bio;
        $member->linkedin = $request->linkedin;
        $member->twitter = $request->twitter;
        $member->status = $request->status;

        // Handle image upload if provided
        if ($request->has('imageId') && $request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);

            if ($tempImage != null) {
                // Delete old image if exists
                if ($member->image) {
                    $oldImagePath = public_path('uploads/members/' . $member->image);
                    if (File::exists($oldImagePath)) {
                        File::delete($oldImagePath);
                    }
                }

                $fileName = $tempImage->name;
                $member->image = $fileName;
            }
        }

        $member->save();

        return response()->json([
            'status' => true,
            'message' => 'Member updated successfully!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $member = Members::find($id);

        if ($member == null) {
            return response()->json([
                'status' => false,
                'message' => 'Member not found!'
            ]);
        }

        // Delete associated image if exists
        if ($member->image) {
            $imagePath = public_path('uploads/members/' . $member->image);
            if (File::exists($imagePath)) {
                File::delete($imagePath);
            }
        }

        $member->delete();

        return response()->json([
            'status' => true,
            'message' => 'Member deleted successfully!'
        ]);
    }
}
