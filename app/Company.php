<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    public $timestamps = false;

    public function scopeUpdateCompany($query, $id, $data)
    {
        return
            $query->where('id', $id)
                ->update($data);
    }
}