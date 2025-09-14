<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Services;
use App\Models\Projects;
use App\Models\Articles;
use App\Models\Testimonials;
use App\Models\Members;
use App\Models\TempImage;

class DashboardController extends Controller
{
    public function index(){
        // Get counts for dashboard statistics
        $stats = [
            'services' => [
                'total' => Services::count(),
                'active' => Services::where('status', 1)->count(),
                'inactive' => Services::where('status', 0)->count(),
            ],
            'projects' => [
                'total' => Projects::count(),
                'active' => Projects::where('status', 1)->count(),
                'inactive' => Projects::where('status', 0)->count(),
            ],
            'articles' => [
                'total' => Articles::count(),
                'active' => Articles::where('status', 1)->count(),
                'inactive' => Articles::where('status', 0)->count(),
            ],
            'testimonials' => [
                'total' => Testimonials::count(),
                'active' => Testimonials::where('status', 1)->count(),
                'inactive' => Testimonials::where('status', 0)->count(),
            ],
            'members' => [
                'total' => Members::count(),
                'active' => Members::where('status', 1)->count(),
                'inactive' => Members::where('status', 0)->count(),
            ],
            'temp_images' => [
                'total' => TempImage::count(),
                'today' => TempImage::whereDate('created_at', today())->count(),
            ]
        ];

        // Get recent activities
        $recentServices = Services::latest()->take(5)->get(['id', 'title', 'status', 'created_at']);
        $recentProjects = Projects::latest()->take(5)->get(['id', 'title', 'status', 'created_at']);
        $recentArticles = Articles::latest()->take(5)->get(['id', 'title', 'status', 'created_at']);

        return response()->json([
            'status' => true,
            'data' => [
                'stats' => $stats,
                'recent_activities' => [
                    'services' => $recentServices,
                    'projects' => $recentProjects,
                    'articles' => $recentArticles,
                ]
            ]
        ]);
    }
}
