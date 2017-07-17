<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    public $timestamps = false;
    protected $table = 'persons';

    public function scopeUpdatePerson($query, $id, $data)
    {
        return
            $query->where('id', $id)
                ->update($data);
    }
}