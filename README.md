# MoveShare — Fullstack (Backend + Frontend)

This workspace contains two ready-to-copy scaffolds for the MoveShare project:

- `moveshare-backend/` — Laravel backend (Sanctum, MySQL)
- `moveshare-frontend/` — React + Vite + TypeScript frontend

Quick run (PowerShell):

Backend
```powershell
cd c:\Users\USER\Documents\objectif\moveshare-backend
composer install
copy .env.example .env
# Edit .env to set DB_DATABASE=moveshare, DB_USERNAME=root, DB_PASSWORD=
php artisan key:generate
php artisan migrate
php artisan serve --host=127.0.0.1 --port=8000
```

Frontend
```powershell
cd c:\Users\USER\Documents\objectif\moveshare-frontend
npm install
npm run dev
# open http://localhost:5173
```

Notes:
- Create the MySQL database `moveshare` in XAMPP (phpMyAdmin) before running migrations.
- API base used by the frontend: `http://127.0.0.1:8000/api`
- If you want me to run any of the steps here (e.g. run `npm run build` or attempt migrations), tell me and I will run them in the workspace terminal.
