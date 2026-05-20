<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Rindou;
use App\Models\User;

class Post extends Model
{
    public function rindou()
    {
        return $this->belongsTo(Rindou::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
