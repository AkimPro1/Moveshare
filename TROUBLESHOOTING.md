# MoveShare - Guide de Dépannage

## 🔧 Problème: "Impossible de charger le profil"

### Symptôme
Lorsque vous cliquez sur "Mon profil" dans le menu utilisateur, vous voyez le message "Impossible de charger le profil".

### Cause
Les tables de la base de données ne sont pas migrées correctement. Les migrations suivantes sont en attente:
- `create_vehicles_table`
- `create_rides_table`
- `create_bookings_table`
- `create_reviews_table`

### Solution

1. **Vérifier l'état des migrations:**
```powershell
cd moveshare-backend
php artisan migrate:status
```

2. **Si certaines migrations sont en "Pending", les exécuter:**
```powershell
php artisan migrate
```

3. **Si vous voyez une erreur "Table already exists":**

Option A - Réinitialiser complètement la base de données (⚠️ cela supprime toutes les données):
```powershell
php artisan migrate:fresh
```

Option B - Marquer manuellement les migrations comme exécutées:
```powershell
# Se connecter à MySQL
mysql -u root -p

# Dans MySQL:
USE moveshare;

# Vérifier quelles migrations sont déjà dans la table
SELECT * FROM migrations;

# Ajouter manuellement les migrations manquantes
INSERT INTO migrations (migration, batch) VALUES 
('2025_12_18_000001_create_vehicles_table', 2),
('2025_12_18_000002_create_rides_table', 2),
('2025_12_18_000003_create_bookings_table', 2),
('2025_12_20_000001_add_profile_fields_to_users_table', 2),
('2025_12_20_000002_create_reviews_table', 2);
```

4. **Redémarrer le serveur backend:**
```powershell
# Arrêter le serveur actuel (Ctrl+C)
# Puis relancer:
cd moveshare-backend
php artisan serve --host=127.0.0.1 --port=8000
```

5. **Recharger la page profil dans le navigateur**

---

## 🐛 Autres Problèmes Courants

### Problème: Erreur 401 Unauthorized

**Cause:** Le token d'authentification est expiré ou invalide.

**Solution:**
1. Se déconnecter
2. Se reconnecter

### Problème: Le frontend ne se connecte pas au backend

**Vérifications:**
1. Le backend tourne-t-il sur `http://127.0.0.1:8000` ?
2. Le frontend tourne-t-il sur `http://localhost:5173` ?
3. Les deux serveurs sont-ils bien démarrés ?

**Démarrer les serveurs:**
```powershell
# Terminal 1 - Backend
cd moveshare-backend
php artisan serve --host=127.0.0.1 --port=8000

# Terminal 2 - Frontend
cd moveshare-frontend
npm run dev
```

### Problème: CORS errors

**Solution:** Vérifier que `config/cors.php` dans le backend permet les requêtes depuis `localhost:5173`.

---

## 📝 Commandes Utiles

### Backend (Laravel)

```powershell
# Vérifier les routes API
php artisan route:list --path=api

# Vider le cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Vérifier la connexion à la base de données
php artisan tinker
> DB::connection()->getPdo();

# Créer un utilisateur de test
php artisan tinker
> $user = App\Models\User::create(['name' => 'Test User', 'email' => 'test@test.com', 'password' => bcrypt('password'), 'role' => 'driver']);
```

### Frontend (React)

```powershell
# Vider le cache et rebuilder
npm run build

# Vérifier les dépendances
npm list

# Réinstaller les dépendances
Remove-Item -Recurse -Force node_modules
npm install
```

---

## 🔍 Logs et Debugging

### Voir les logs du backend Laravel:
```powershell
# En temps réel
Get-Content .\storage\logs\laravel.log -Wait -Tail 50
```

### Activer le mode debug:
Dans `.env` du backend:
```
APP_DEBUG=true
```

⚠️ **Attention:** Ne jamais activer le mode debug en production!

---

## ✅ Checklist de Vérification

- [ ] MySQL est installé et en cours d'exécution
- [ ] La base de données `moveshare` existe
- [ ] Les migrations sont toutes exécutées
- [ ] Le backend tourne sur port 8000
- [ ] Le frontend tourne sur port 5173
- [ ] Un utilisateur existe dans la base de données
- [ ] Le token d'authentification est valide