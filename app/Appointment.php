<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    public $timestamps = false;

    public function scopeListApps($query)
    {
        return
            $query->select('appointments.*',
                'p.email', 'p.fname', 'p.lname', 'p.phone', 'p.salutation',
                'c.locality', 'c.name', 'c.house', 'c.postal', 'c.site', 'c.street')
                ->join('persons as p', 'p.id', '=', 'appointments.person_id')
                ->join('companies as c', 'c.id', '=', 'p.company_id')
                ->where('appointments.status', '!=', 4)
                ->orderBy('appointments.status')
                ->orderBy('appointments.date');
    }

    public function scopeGetApp($query, $id)
    {
        return
            $query->select('appointments.*',
                'p.company_id', 'p.email', 'p.fname', 'p.lname', 'p.phone', 'p.salutation',
                'c.locality', 'c.name', 'c.house', 'c.postal', 'c.site', 'c.street')
                ->where('appointments.id', $id)
                ->orderBy('appointments.status')
                ->orderBy('appointments.date')
                ->join('persons as p', 'p.id', '=', 'appointments.person_id')
                ->join('companies as c', 'c.id', '=', 'p.company_id');
    }

    public function scopeSaveResultApp($query, $id, $result)
    {
        return
            $query->where('id', $id)
                ->update(['status' => 1, 'result' => $result]);
    }

    public function scopeUpdateApp($query, $id, $data)
    {
        return
            $query->where('id', $id)
                ->update($data);
    }
}
