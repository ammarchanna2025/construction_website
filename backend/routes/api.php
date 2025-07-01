<?php
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\ServicesController;
use App\Http\Controllers\admin\ProjectController;
use App\Http\Controllers\admin\ArticlesController;
use App\Http\Controllers\admin\TestimonialsController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\front\FrontServiceController;
use App\Http\Controllers\front\FrontProjectController;
use App\Http\Controllers\front\FrontArticleController;
use App\Http\Controllers\front\FrontTestimonialController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('authenticate',[AuthenticationController::class,'authenticate']);

Route::get('get-services',[FrontServiceController::class,'index']);
Route::get('get-latest-services',[FrontServiceController::class,'latestServices']);

Route::get('get-projects',[FrontProjectController::class,'index']);
Route::get('get-latest-projects',[FrontProjectController::class,'latestProjects']);

Route::get('get-articles',[FrontArticleController::class,'index']);
Route::get('get-latest-articles',[FrontArticleController::class,'latestArticles']);

Route::get('get-testimonials',[FrontTestimonialController::class,'index']);
Route::get('get-latest-testimonials',[FrontTestimonialController::class,'latestTestimonials']);




Route::group(['middleware' => ['auth:sanctum']],function(){
    Route::get('dashboard',[DashboardController::class,'index']);
    Route::get('logout',[AuthenticationController::class,'logout']);

    //Services Routes
    Route::post('services',[ServicesController::class,'store']);
    Route::get('services',[ServicesController::class,'index']);
    Route::put('services/{id}',[ServicesController::class,'update']);
    Route::get('services/{id}',[ServicesController::class,'show']);
    Route::delete('services/{id}',[ServicesController::class,'destroy']);


    //Project
    Route::post('projects',[ProjectController::class,'store']);
    Route::get('projects',[ProjectController::class,'index']);
    Route::put('projects/{id}',[ProjectController::class,'update']);
    Route::get('projects/{id}',[ProjectController::class,'show']);
    Route::delete('projects/{id}',[ProjectController::class,'destroy']);

    //Articles
    Route::post('articles',[ArticlesController::class,'store']);
    Route::get('articles',[ArticlesController::class,'index']);
    Route::put('articles/{id}',[ArticlesController::class,'update']);
    Route::get('articles/{id}',[ArticlesController::class,'show']);
    Route::delete('articles/{id}',[ArticlesController::class,'destroy']);

     //Testimonials
     Route::post('testimonials',[TestimonialsController::class,'store']);
     Route::get('testimonials',[TestimonialsController::class,'index']);
     Route::put('testimonials/{id}',[TestimonialsController::class,'update']);
     Route::get('testimonials/{id}',[TestimonialsController::class,'show']);
     Route::delete('testimonials/{id}',[TestimonialsController::class,'destroy']);


    Route::post('temp-images',[TempImageController::class,'store']);




});

