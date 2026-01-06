# MoveShare Backend - Configuration

## Installation et Configuration

### 1. Installer les dépendances
```bash
composer install
```

### 2. Configuration de l'environnement
Copiez le fichier `.env.example` vers `.env` et configurez votre base de données :
```bash
cp .env.example .env
```

Modifiez les paramètres de base de données dans `.env` :
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=moveshare
DB_USERNAME=root
DB_PASSWORD=
```

### 3. Générer la clé d'application
```bash
php artisan key:generate
```

### 4. Créer la base de données
Créez une base de données nommée `moveshare` dans MySQL/MariaDB

### 5. Exécuter les migrations
```bash
php artisan migrate
```

Cela créera les tables suivantes :
- `users` - Utilisateurs (conducteurs et passagers)
- `vehicles` - Véhicules des conducteurs
- `rides` - Trajets proposés
- `bookings` - Réservations de trajets

### 6. Créer le lien symbolique pour le stockage
```bash
php artisan storage:link
```

Cela permettra d'accéder aux photos de véhicules uploadées.

### 7. Démarrer le serveur
```bash
php artisan serve
```

Le backend sera accessible sur `http://127.0.0.1:8000`

## Structure de la Base de Données

### Table `users`
- `id` - ID utilisateur
- `name` - Nom complet
- `email` - Email (unique)
- `phone` - Téléphone
- `role` - Rôle (driver/passenger)
- `password` - Mot de passe hashé

### Table `vehicles`
- `id` - ID véhicule
- `user_id` - ID du propriétaire
- `brand` - Marque
- `model` - Modèle
- `year` - Année
- `color` - Couleur
- `license_plate` - Immatriculation (unique)
- `seats` - Nombre de places
- `vehicle_type` - Type (car/van/suv)
- `verification_status` - Statut de vérification (verified/pending/unverified)
- `photos` - Photos (JSON array)

### Table `rides`
- `id` - ID trajet
- `user_id` - ID du conducteur
- `car_id` - ID du véhicule
- `start_location` - Lieu de départ
- `end_location` - Destination
- `ride_date` - Date du trajet
- `ride_time` - Heure de départ
- `price_per_seat` - Prix par place
- `available_seats` - Places disponibles
- `total_seats` - Places totales
- `status` - Statut (active/completed/cancelled)

### Table `bookings`
- `id` - ID réservation
- `ride_id` - ID du trajet
- `user_id` - ID du passager
- `seats_booked` - Nombre de places réservées
- `status` - Statut (pending/confirmed/cancelled)

## API Endpoints

### Authentification
- `POST /api/register` - Inscription
- `POST /api/login` - Connexion
- `GET /api/me` - Informations utilisateur connecté

### Véhicules (authentification requise)
- `GET /api/vehicles` - Liste des véhicules de l'utilisateur
- `POST /api/vehicles` - Créer un véhicule
- `GET /api/vehicles/{id}` - Détails d'un véhicule
- `PUT/PATCH /api/vehicles/{id}` - Modifier un véhicule
- `DELETE /api/vehicles/{id}` - Supprimer un véhicule

### Trajets (authentification requise)
- `GET /api/rides` - Liste des trajets disponibles (avec filtres)
- `POST /api/rides` - Créer un trajet
- `GET /api/rides/{id}` - Détails d'un trajet
- `POST /api/rides/{id}/book` - Réserver un trajet
- `POST /api/rides/{id}/cancel` - Annuler une réservation

## Paramètres de Recherche pour `/api/rides`

- `search` - Recherche par lieu (départ ou arrivée)
- `date` - Filtrer par date (YYYY-MM-DD)
- `min_price` - Prix minimum par place
- `max_price` - Prix maximum par place
- `min_seats` - Nombre minimum de places disponibles

Exemple :
```
GET /api/rides?search=Paris&date=2024-12-25&min_seats=2
```

## Upload de Photos

Pour uploader des photos de véhicules, utilisez `multipart/form-data` :

```javascript
const formData = new FormData()
formData.append('brand', 'Toyota')
formData.append('model', 'Corolla')
// ... autres champs
formData.append('photos[]', file1)
formData.append('photos[]', file2)

axios.post('/api/vehicles', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
})
```

## Sécurité

- Toutes les routes (sauf register/login) nécessitent une authentification via Laravel Sanctum
- Les tokens sont envoyés dans le header `Authorization: Bearer {token}`
- Les utilisateurs ne peuvent modifier/supprimer que leurs propres véhicules
- Les conducteurs ne peuvent pas réserver leurs propres trajets
- Vérification de la disponibilité des places avant réservation

## Tests

Pour tester l'API, vous pouvez utiliser :
- Postman
- Insomnia
- Thunder Client (extension VS Code)

Ou directement depuis le frontend React que nous avons créé !