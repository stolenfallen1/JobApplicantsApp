<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobApplicants extends Model
{
    protected $fillable = [
        'region',
        'province',
        'city',
        'last_name',
        'first_name',
        'middle_name',
        'sex',
        'age',
        'marital_status',
        'course',
    ];
}
