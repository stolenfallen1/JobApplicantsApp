# Job Applicants App - Exam Submission README Instructions

## Features

- Job applicants CRUD operations ( CREATE, READ, UPDATE, DELETE )
- Dynamic PSGC (Philippine Standard Geographic Code) integration
- DATA TABLES
- User authentication and authorization
- Advanced filtering capabilities

## Tech Stack

- Backend: Laravel 12 ( Latest )
- Frontend: React with TypeScript + InertiaJS
- UI Components: Shadcn UI
- Database: MySQL 8.0
- Styling: Tailwind CSS

## Prerequisites

- PHP 8.3 or higher
- Node.js 18+ and npm
- MySQL 8.0+
- Composer

## Installation

1. Clone the repository:
```
git clone git@github.com:stolenfallen1/JobApplicantsApp.git
cd job_applicants_app
```
2. Install PHP dependencies:
```
composer install
```
3. Install JavaScript dependencies:
```
npm install
```
4. Create a .env file by copying the .env.example file:
```
cp .env.example .env
```
5. Generate an application key:
```
php artisan key:generate
```
6. Database Setup: 
Configure your .env file with database credentials ( copy the .env.example )
Then run migrations and seeders
```
php artisan migrate:fresh --seed
```
7. Run database migrations:
```
php artisan migrate
```
8. Start the development server:
```
composer run dev
```
