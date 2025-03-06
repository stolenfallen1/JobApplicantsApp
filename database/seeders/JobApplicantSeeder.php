<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobApplicantSeeder extends Seeder
{
    public function run(): void
    {
        $sql = file_get_contents(database_path('dumps/job_applicant.dump'));
        DB::unprepared($sql);
    }
}
