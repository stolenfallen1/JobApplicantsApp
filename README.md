# Job Applicants Management System

## Features

- Job applicants CRUD operations ( CREATE, READ, UPDATE, DELETE )
- Dynamic PSGC (Philippine Standard Geographic Code) integration
- DATA TABLES
- User authentication and authorization
- Pagination and dynamic row display options
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
```bash
git clone <your-repository-url>
cd job_applicants_app

2. Install PHP dependencies:
```bash
composer install

3. Install JavaScript dependencies:
```bash
npm install

4. Create a .env file by copying the .env.example file:
```bash
cp .env.example .env

5. Generate an application key:
```bash
php artisan key:generate

6. Database Setup: 
Option A - Using Laravel Migrations with Seeders:
```bash
# Create the database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS JobApplicant;"

# Configure your .env file with database credentials
# Then run migrations and seeders
php artisan migrate:fresh --seed
```

( Option 3 - Using Table Plus )
Import connection file from: database/dumps/tableplus_connection_dump_march_7_2025.tableplusconnection

7. Run database migrations:
```bash
php artisan migrate

8. Start the development server:
```bash
composer run dev