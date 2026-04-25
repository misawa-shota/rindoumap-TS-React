<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Clear extends Model
{
    public function rindou()
    {
        return $this->belongsTo(Rindou::class);
    }
}
