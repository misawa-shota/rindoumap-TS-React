<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RindouImage extends Model
{
    protected $fillable = [
        'rindou_id',
        'position',
        'thumbnail',
        'original',
        'link',
        'title',
        'source',
    ];
}
