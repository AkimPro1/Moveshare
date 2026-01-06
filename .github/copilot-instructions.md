# MoveShare — Copilot Instructions

This file contains focused, actionable guidance for an AI coding agent to become productive quickly in this workspace (backend + frontend).

**Project Overview**
- Backend: Laravel API in `moveshare-backend/` (Sanctum for token auth). Key routes in `routes/api.php`, main auth logic in `app/Http/Controllers/AuthController.php`, Eloquent model `app/Models/User.php` and migrations in `database/migrations/`.
- Frontend: React + Vite + TypeScript in `moveshare-frontend/`. Entry: `src/main.tsx`. API client: `src/api/axiosClient.ts`. Pages in `src/pages/` (`Register.tsx`, `Login.tsx`, `Home.tsx`).

**Big-picture architecture & data flow**
- Frontend sends JSON to backend API at `http://127.0.0.1:8000/api` via `axiosClient` which injects `Authorization: Bearer <token>` from `localStorage`.
- Backend issues personal access tokens via Sanctum in `AuthController::register()` and `login()`; protected endpoints use `auth:sanctum` middleware (see `routes/api.php`).

**How to run (developer commands)**
- Backend (Windows PowerShell):
  ```powershell
  cd moveshare-backend
  composer install
  copy .env.example .env
  # edit DB_* to point to MySQL database `moveshare`
  php artisan key:generate
  php artisan migrate
  php artisan serve --host=127.0.0.1 --port=8000
  ```
- Frontend:
  ```powershell
  cd moveshare-frontend
  npm install
  npm run dev
  # open http://localhost:5173
  ```

**Project-specific conventions & patterns**
- Token storage: frontend stores token under `localStorage['token']` and `axiosClient` adds it to requests. Look at `src/api/axiosClient.ts` for interceptors.
- Validation errors: backend returns Laravel 422 with `errors` object; frontend components expect and render these (see `Register.tsx`).
- TypeScript: `tsconfig.json` uses `moduleResolution: Node` and includes `types: ["vite/client"]`. If the editor flags `tsconfig.json` line 1, prefer workspace TypeScript or set `moduleResolution` to `Node`.

**Key files to inspect when debugging**
- Backend: `routes/api.php`, `app/Http/Controllers/AuthController.php`, `app/Models/User.php`, `config/cors.php`, `database/migrations/*`.
- Frontend: `src/api/axiosClient.ts`, `src/pages/Register.tsx`, `src/pages/Login.tsx`, `src/pages/Home.tsx`, `src/main.tsx`, `tsconfig.json`.

**Common runtime problems & fixes**
- ERR_CONNECTION_REFUSED: Usually backend not running or wrong baseURL. Confirm `php artisan serve` is running and `axiosClient.baseURL` matches (currently `http://127.0.0.1:8000/api`).
- 404 on `/api/*`: Caused by running PHP built-in server directly (`php -S`) in wrong directory. Always use `php artisan serve` from `moveshare-backend`.
- Missing CSS or assets: Vite expects `src/index.css` (created). If HMR reports missing imports, verify file paths relative to `src`.

**Testing endpoints quickly**
- Register test (PowerShell/curl):
  ```powershell
  Invoke-RestMethod -Method POST -Uri http://127.0.0.1:8000/api/register -Body (ConvertTo-Json @{ name='Alice'; email='a@a.com'; phone='0123'; role='passenger'; password='Password123!'; password_confirmation='Password123!' }) -ContentType 'application/json'
  ```

**When editing code**
- Backend: prefer updating migrations only when you know the DB state; add incremental migrations to change existing tables instead of editing applied migrations.
- Frontend: after changing `package.json` or `tsconfig.json` run `npm install` and restart Vite (`npm run dev`) to re-optimize dependencies.

**Where to ask for help / what to capture**
- If registration/login fails: capture the browser Network request for `POST /api/register` (status, response body), and the Laravel server console output.
- If TypeScript errors appear: run `npx tsc --noEmit` in `moveshare-frontend/` and paste the output.

Please review this guidance. Tell me which parts to expand (examples of common fixes, routes to add, or development scripts to include) and I will iterate the file.
