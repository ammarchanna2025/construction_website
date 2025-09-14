<?php

namespace App\Services;

use App\Models\TempImage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class TempImageCleanupService
{
    /**
     * Clean up temporary images older than specified hours
     */
    public function cleanupOldImages($hoursOld = 24)
    {
        $cutoffTime = Carbon::now()->subHours($hoursOld);
        
        $oldTempImages = TempImage::where('created_at', '<', $cutoffTime)->get();
        
        $deletedCount = 0;
        $errorCount = 0;
        
        foreach ($oldTempImages as $tempImage) {
            try {
                // Delete physical file
                $tempImage->deleteFile();
                
                // Delete database record
                $tempImage->delete();
                
                $deletedCount++;
                
                Log::info("Cleaned up temp image: {$tempImage->name}");
            } catch (\Exception $e) {
                $errorCount++;
                Log::error("Failed to cleanup temp image {$tempImage->name}: " . $e->getMessage());
            }
        }
        
        Log::info("Temp image cleanup completed. Deleted: {$deletedCount}, Errors: {$errorCount}");
        
        return [
            'deleted' => $deletedCount,
            'errors' => $errorCount,
            'total_processed' => $oldTempImages->count()
        ];
    }
    
    /**
     * Clean up orphaned temp images (files without database records)
     */
    public function cleanupOrphanedFiles()
    {
        $tempDir = public_path('uploads/temp');
        
        if (!File::exists($tempDir)) {
            return ['deleted' => 0, 'errors' => 0, 'total_processed' => 0];
        }
        
        $files = File::files($tempDir);
        $deletedCount = 0;
        $errorCount = 0;
        
        foreach ($files as $file) {
            $fileName = $file->getFilename();
            
            // Check if this file has a corresponding database record
            $tempImage = TempImage::where('name', $fileName)->first();
            
            if (!$tempImage) {
                try {
                    File::delete($file->getPathname());
                    $deletedCount++;
                    Log::info("Deleted orphaned temp file: {$fileName}");
                } catch (\Exception $e) {
                    $errorCount++;
                    Log::error("Failed to delete orphaned temp file {$fileName}: " . $e->getMessage());
                }
            }
        }
        
        Log::info("Orphaned temp files cleanup completed. Deleted: {$deletedCount}, Errors: {$errorCount}");
        
        return [
            'deleted' => $deletedCount,
            'errors' => $errorCount,
            'total_processed' => count($files)
        ];
    }
    
    /**
     * Clean up database records without corresponding files
     */
    public function cleanupOrphanedRecords()
    {
        $tempImages = TempImage::all();
        $deletedCount = 0;
        $errorCount = 0;
        
        foreach ($tempImages as $tempImage) {
            if (!$tempImage->fileExists()) {
                try {
                    $tempImage->delete();
                    $deletedCount++;
                    Log::info("Deleted orphaned temp image record: {$tempImage->name}");
                } catch (\Exception $e) {
                    $errorCount++;
                    Log::error("Failed to delete orphaned temp image record {$tempImage->name}: " . $e->getMessage());
                }
            }
        }
        
        Log::info("Orphaned temp records cleanup completed. Deleted: {$deletedCount}, Errors: {$errorCount}");
        
        return [
            'deleted' => $deletedCount,
            'errors' => $errorCount,
            'total_processed' => $tempImages->count()
        ];
    }
    
    /**
     * Perform complete cleanup (old images, orphaned files, and orphaned records)
     */
    public function performCompleteCleanup($hoursOld = 24)
    {
        $results = [
            'old_images' => $this->cleanupOldImages($hoursOld),
            'orphaned_files' => $this->cleanupOrphanedFiles(),
            'orphaned_records' => $this->cleanupOrphanedRecords()
        ];
        
        $totalDeleted = $results['old_images']['deleted'] + 
                       $results['orphaned_files']['deleted'] + 
                       $results['orphaned_records']['deleted'];
        
        $totalErrors = $results['old_images']['errors'] + 
                      $results['orphaned_files']['errors'] + 
                      $results['orphaned_records']['errors'];
        
        Log::info("Complete temp image cleanup finished. Total deleted: {$totalDeleted}, Total errors: {$totalErrors}");
        
        return $results;
    }
    
    /**
     * Move temp image to permanent location and clean up temp record
     */
    public function moveImageToPermanentLocation(TempImage $tempImage, $destinationFolder, $newName = null)
    {
        $newName = $newName ?: $tempImage->name;
        $destinationPath = public_path("uploads/{$destinationFolder}");
        
        try {
            // Move the file
            if ($tempImage->moveTo($destinationPath, $newName)) {
                // Delete the temp record
                $tempImage->delete();
                
                Log::info("Moved temp image {$tempImage->name} to {$destinationFolder}/{$newName}");
                return true;
            }
            
            return false;
        } catch (\Exception $e) {
            Log::error("Failed to move temp image {$tempImage->name}: " . $e->getMessage());
            return false;
        }
    }
}
