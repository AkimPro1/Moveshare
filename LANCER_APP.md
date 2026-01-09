# 🚀 Lancer MoveShare

## Terminal 1 - Backend Laravel

```powershell
cd "c:\Users\USER\Documents\objectif\moveshare-backend"
php artisan serve --host=127.0.0.1 --port=8000
```

✅ Le backend sera disponible sur : http://127.0.0.1:8000

## Terminal 2 - Frontend React

```powershell
cd "c:\Users\USER\Documents\objectif\moveshare-frontend"
npm run dev
```

✅ Le frontend sera disponible sur : http://localhost:5173

---

## 🔧 Dépannage

### Backend ne démarre pas
- Vérifier que vous êtes dans le bon répertoire : `moveshare-backend`
- Vérifier que PHP est installé : `php --version`
- Vérifier le fichier `.env` : doit contenir les infos BD

### Frontend ne démarre pas
- Vérifier que vous êtes dans : `moveshare-frontend`
- Supprimer `node_modules` et `npm install` si nécessaire
- Vérifier que Node.js est installé : `node --version`

### Port déjà utilisé
- Backend : changer le port 8000 en 8001 : `php artisan serve --host=127.0.0.1 --port=8001`
- Frontend : Vite trouvera automatiquement un autre port

---

## ✨ Améliorations Réalisées

✅ Mode Sombre/Clair avec toggle dans la barre de navigation
✅ Vérifications de rôle (driver/passenger) sur les endpoints sensibles
✅ Corrections des contrastes en dark mode
✅ Corrections des pages de détails de trajets
✅ Tous les backgrounds adaptatifs aux deux thèmes
✅ Footer visible et lisible en dark mode

---

## 📝 Notes

- Mode par défaut : détection automatique selon les préférences système
- Préférence sauvegardée dans localStorage
- Tous les textes sont lisibles en clair et en sombre
- API Backend : http://127.0.0.1:8000/api
