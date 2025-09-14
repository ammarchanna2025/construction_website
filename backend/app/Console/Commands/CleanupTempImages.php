<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\TempImageCleanupService;

class CleanupTempImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'temp-images:cleanup 
                            {--hours=24 : Number of hours old images should be to be cleaned up}
                            {--complete : Perform complete cleanup including orphaned files and records}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean up old temporary images and orphaned files';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $cleanupService = new TempImageCleanupService();
        $hours = $this->option('hours');
        $complete = $this->option('complete');

        $this->info("Starting temporary image cleanup...");

        if ($complete) {
            $this->info("Performing complete cleanup (old images, orphaned files, and orphaned records)");
            $results = $cleanupService->performCompleteCleanup($hours);
            
            $this->table(
                ['Type', 'Deleted', 'Errors', 'Total Processed'],
                [
                    ['Old Images', $results['old_images']['deleted'], $results['old_images']['errors'], $results['old_images']['total_processed']],
                    ['Orphaned Files', $results['orphaned_files']['deleted'], $results['orphaned_files']['errors'], $results['orphaned_files']['total_processed']],
                    ['Orphaned Records', $results['orphaned_records']['deleted'], $results['orphaned_records']['errors'], $results['orphaned_records']['total_processed']]
                ]
            );
            
            $totalDeleted = $results['old_images']['deleted'] + $results['orphaned_files']['deleted'] + $results['orphaned_records']['deleted'];
            $totalErrors = $results['old_images']['errors'] + $results['orphaned_files']['errors'] + $results['orphaned_records']['errors'];
            
            $this->info("Complete cleanup finished. Total deleted: {$totalDeleted}, Total errors: {$totalErrors}");
        } else {
            $this->info("Cleaning up images older than {$hours} hours");
            $result = $cleanupService->cleanupOldImages($hours);
            
            $this->table(
                ['Deleted', 'Errors', 'Total Processed'],
                [[$result['deleted'], $result['errors'], $result['total_processed']]]
            );
            
            $this->info("Cleanup completed. Deleted: {$result['deleted']}, Errors: {$result['errors']}");
        }

        return Command::SUCCESS;
    }
}
