<?php

use App\Http\Controllers\Applicants\JobApplicantController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [JobApplicantController::class, 'index'])
        ->name('dashboard');

    Route::get('applicants/create', [JobApplicantController::class, 'create'])
        ->name('applicants.create');

    Route::post('applicants', [JobApplicantController::class, 'store'])
        ->name('applicants.store');

    Route::get('applicants/{applicant}/edit', [JobApplicantController::class, 'edit'])
        ->name('applicants.edit');

    Route::put('applicants/{applicant}', [JobApplicantController::class, 'update'])
        ->name('applicants.update');        

    Route::delete('applicants/{applicant}', [JobApplicantController::class, 'destroy'])
        ->name('applicants.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
