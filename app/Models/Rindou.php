<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Post;

class Rindou extends Model
{
    public function clears()
    {
        return $this->hasMany(Clear::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
