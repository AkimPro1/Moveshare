---
description: Repository Information Overview
alwaysApply: true
---

# MoveShare Repository Information

## Repository Summary
MoveShare is a fullstack ride-sharing web application with a Laravel 10 REST API backend and a React 18 + Vite frontend. The backend provides token-based authentication (Sanctum) and manages vehicles, rides, and bookings. The frontend handles user registration, login, and ride management with real-time updates.

## Repository Structure
- **moveshare-backend/**: Laravel 10 REST API with Sanctum auth, Eloquent models (User, Vehicle, Ride, Booking), MySQL database
- **moveshare-frontend/**: React 18 + Vite + TypeScript SPA with routing, axios HTTP client, reusable components
- **.github/**: Copilot instructions for development guidance
- **.zencoder/ & .zenflow/**: Workflow configurations

### Main Components
- **API Backend**: Auth endpoints, Vehicle CRUD, Ride management (create, book, cancel)
- **Frontend SPA**: Auth pages (Register/Login), Home dashboard, Vehicle management, Rides list/creation
- **Database**: MySQL with migrations for users, vehicles, rides, bookings
- **HTTP Client**: Axios with Bearer token interceptors for Sanctum authentication

## Projects

### Frontend (moveshare-frontend)

**Configuration File**: `moveshare-frontend/package.json`

#### Language & Runtime
**Language**: TypeScript (5.0+)  
**Runtime**: Node.js  
**Build Tool**: Vite 5.0  
**Package Manager**: npm  
**Framework**: React 18.2

#### Dependencies
**Main Dependencies**:
- **react**: 18.2.0 — UI library
- **react-dom**: 18.2.0 — DOM rendering
- **react-router-dom**: 6.15.0 — Client-side routing
- **axios**: 1.6.0 — HTTP client with interceptors
- **lucide-react**: 0.561.0 — Icon library

**Development Dependencies**:
- **typescript**: 5.0.0
- **vite**: 5.0.0
- **@vitejs/plugin-react**: 4.0.0
- **@types/react**, **@types/react-dom**: 18.2.0

#### Build & Installation
```bash
cd moveshare-frontend
npm install
npm run dev       # Start dev server on http://127.0.0.1:5173
npm run build     # Production build
npm run preview   # Preview production build
```

#### Configuration
- **vite.config.ts**: Dev server on port 5173, React plugin enabled
- **tsconfig.json**: ES2020 target, strict mode, JSX support
- **API Client**: `src/api/axiosClient.ts` with Bearer token authorization from localStorage

#### Main Files
- **src/main.tsx**: Entry point
- **src/App.tsx**: Router setup
- **src/pages/**: Auth (Login, Register), Home, Vehicle/Ride management
- **src/components/**: Reusable Input, Select, Modal components
- **src/api/axiosClient.ts**: Axios instance with Sanctum token interceptors

#### Testing
No test framework currently configured in package.json.

---

### Backend (moveshare-backend)

**Configuration File**: `moveshare-backend/composer.json`

#### Language & Runtime
**Language**: PHP  
**Version**: 8.1+  
**Framework**: Laravel 10.10  
**Package Manager**: Composer  
**Web Server**: PHP built-in (via `php artisan serve`)

#### Dependencies
**Main Dependencies**:
- **laravel/framework**: 10.10 — Web framework
- **laravel/sanctum**: 3.3 — Token-based API authentication
- **guzzlehttp/guzzle**: 7.2 — HTTP client
- **laravel/tinker**: 2.8 — REPL for artisan

**Development Dependencies**:
- **phpunit/phpunit**: 10.1 — Testing framework
- **laravel/pint**: 1.0 — Code style formatter
- **fakerphp/faker**: 1.9.1 — Test data generation
- **mockery/mockery**: 1.4.4 — Mocking library

#### Build & Installation
```bash
cd moveshare-backend
composer install
copy .env.example .env
# Edit .env: DB_DATABASE=moveshare, DB_USERNAME=root, DB_PASSWORD=
php artisan key:generate
php artisan migrate
php artisan serve --host=127.0.0.1 --port=8000
```

#### Configuration
- **Database**: MySQL 5.7+ (adjust DB_* in .env)
- **Authentication**: Sanctum personal access tokens
- **CORS**: Configured in `config/cors.php` for frontend origin

#### Main Files & Controllers
- **routes/api.php**: 
  - `POST /register`, `POST /login` (AuthController)
  - `GET /me` (protected, AuthController)
  - `GET /ping` (connectivity check)
  - Protected group: `/vehicles` (CRUD), `/rides` (index, store, show, book, cancel)
- **app/Http/Controllers/**: AuthController, VehicleController, RideController
- **app/Models/**: User, Vehicle, Ride, Booking (Eloquent models with relationships)
- **database/migrations/**: Schema for users, vehicles, rides, bookings

#### Testing
**Framework**: PHPUnit 10.1  
**Configuration**: `phpunit.xml`  
**Naming Convention**: Tests in `tests/` directory  
**Run Command**:
```bash
php artisan test
```

---

## Development Workflow

### Prerequisites
- **PHP 8.1+** with composer
- **Node.js** (npm)
- **MySQL 5.7+** (create database `moveshare` via phpMyAdmin)

### Quick Start (Windows PowerShell)
```powershell
# Backend
cd moveshare-backend
composer install
copy .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve --host=127.0.0.1 --port=8000

# Frontend (new terminal)
cd moveshare-frontend
npm install
npm run dev
# Open http://localhost:5173
```

### Key Integration Points
- Frontend calls `http://127.0.0.1:8000/api/*` endpoints
- Sanctum tokens stored in `localStorage['token']`
- Axios auto-injects `Authorization: Bearer <token>` header
- Backend validates tokens via `auth:sanctum` middleware
- Validation errors (422) returned as `{ errors: {...} }` JSON

