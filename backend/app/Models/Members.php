<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Members extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'designation',
        'email',
        'phone',
        'bio',
        'image',
        'linkedin',
        'twitter',
        'status'
    ];

    protected $casts = [
        'status' => 'integer',
    ];
}
