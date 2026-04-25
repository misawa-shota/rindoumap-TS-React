<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rindou extends Model
{
    public function clears()
    {
        return $this->hasMany(Clear::class);
    }
}
