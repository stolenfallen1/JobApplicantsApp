<?php

namespace App\Http\Controllers\Applicants;

use App\Http\Controllers\Controller;
use App\Models\JobApplicants;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobApplicantController extends Controller
{
    //
    public function create() 
    {
        return Inertia::render('applicants/create');
    }

    public function index() 
    {
        $applicants = JobApplicants::latest()->get();

        return Inertia::render('dashboard', [
            'applicants' => $applicants
        ]);
    }

    public function store(Request $request) 
    {
        try {
            $validated = $request->validate([
                'region'         => 'required|string',
                'province'       => 'required|string',
                'city'          => 'required|string',
                'last_name'     => 'required|string',
                'first_name'    => 'required|string',
                'middle_name'   => 'required|string',
                'sex'           => 'required|string',
                'age'           => 'required|string',
                'marital_status'=> 'required|string',
                'course'        => 'required|string',
            ]);
    
            JobApplicants::create($validated);
            
            return redirect()->route('dashboard')->with([
                'message' => 'Job Applicant Added!',
                'type' => 'success'
            ]);
            
        } catch (\Exception $e) {
            return back()->with([
                'message' => 'Failed to add Job Applicant!',
                'type' => 'error'
            ])->withInput();
        }
    }

    public function destroy(JobApplicants $applicant) 
    {
        try {
            $applicant->delete();
            return redirect()->route('dashboard')->with([
                'message' => 'Job Applicant Deleted!',
                'type' =>'success'
            ]);
        } catch (\Exception $e) {
            return back()->with([
                'message' => 'Failed to delete Job Applicant!',
                'type' => 'error'
            ]);
        }
    }
}
