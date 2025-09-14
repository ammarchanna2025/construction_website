<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;

class TempImage extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    /**
     * Get the full path to the temporary image
     */
    public function getFullPathAttribute()
    {
        return public_path('uploads/temp/' . $this->name);
    }

    /**
     * Check if the physical file exists
     */
    public function fileExists()
    {
        return File::exists($this->full_path);
    }

    /**
     * Delete the physical file
     */
    public function deleteFile()
    {
        if ($this->fileExists()) {
            return File::delete($this->full_path);
        }
        return true;
    }

    /**
     * Move temp image to permanent location
     */
    public function moveTo($destinationPath, $newName = null)
    {
        $newName = $newName ?: $this->name;
        $destinationFullPath = $destinationPath . '/' . $newName;

        if ($this->fileExists()) {
            // Ensure destination directory exists
            $destinationDir = dirname($destinationFullPath);
            if (!File::exists($destinationDir)) {
                File::makeDirectory($destinationDir, 0755, true);
            }

            // Move the file
            return File::move($this->full_path, $destinationFullPath);
        }

        return false;
    }
}
