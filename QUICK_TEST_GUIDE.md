# 🚀 Guide Rapide - Tester les Jeux

## ⚡ 30 Secondes Pour Commencer

### 1. Lancer l'Application
```powershell
cd moveshare-frontend
npm run dev
```
Ouvrez: `http://localhost:5175`

### 2. Accéder aux Jeux
1. Cliquez sur **"Divertissement"** dans la barre de navigation (haut)
2. Cliquez sur l'onglet **"Jeux"**
3. Cliquez **"Jouer"** sur une des 3 cartes

---

## 🎮 Tests Rapides

### Test 1: 2048 (2 minutes)
```
✓ Clic "Jouer" → Grille 4×4 s'affiche
✓ Appuyez ← (flèche gauche) → Tuiles se déplacent
✓ Appuyez ↑↓→ → Tous les mouvements fonctionnent
✓ Appuyez ↓ plusieurs fois → Nouvelles tuiles apparaissent
✓ Combinez 2 tuiles identiques → Elles fusionnent
✓ Score augmente à chaque fusion
✓ Clic X (haut-droit) → Modale se ferme
✓ Clic en dehors modale → Se ferme aussi

Résultat: ✅ 2048 Fonctionne Parfaitement
```

### Test 2: Reaction Game (1 minute)
```
✓ Clic "Jouer" → Message "Click Start Test when ready!"
✓ Clic "Start Test" → Feu rouge + "Wait for green..."
✓ Attendre 2-5 sec → Feu devient vert + "CLICK NOW!"
✓ Clic sur feu vert → Temps s'affiche (ex: "145ms")
✓ Clic "Try Again" → Réinitialise et refait un test
✓ X ou click dehors → Ferme la modale

Résultat: ✅ Reaction Game Fonctionne Parfaitement
```

### Test 3: Trivia Quiz (2 minutes)
```
✓ Clic "Jouer" → Affiche une question + 4 réponses
✓ Score affiché: "Score: 0/4"
✓ Clic sur mauvaise réponse → Devient rouge
✓ Bonne réponse → Devient vert
✓ Score augmente si correct
✓ Clic "Next Question" → Question suivante
✓ Après 4 questions → Écran "Score final: X/4"
✓ Clic "Rejouer" → Recommence depuis question 1

Résultat: ✅ Trivia Quiz Fonctionne Parfaitement
```

---

## 🎯 Checklist de Validation

### Visuelle
- [ ] Les 3 cartes de jeux affichées
- [ ] Emojis présents (🔢 ⚡ 🎯)
- [ ] Boutons "Jouer" visibles et cliquables
- [ ] Modales ont un X pour fermer

### Fonctionnelle
- [ ] Les jeux se lancent au clic
- [ ] Les jeux reçoivent les interactions (clavier/souris)
- [ ] Les scores se mettent à jour en temps réel
- [ ] Les animations fonctionnent
- [ ] On peut fermer et relancer un jeu

### Design
- [ ] Couleurs cohérentes (cyan/purple)
- [ ] Responsive (test sur mobile aussi)
- [ ] Pas de scintillement
- [ ] Aucun texte coupé

---

## 📱 Test Mobile

### Sur Téléphone
1. Sur le même réseau WiFi
2. Trouvez l'IP de votre PC: `ipconfig` → IPv4 Address
3. Sur téléphone: `http://<IP>:5175`
4. Testez les jeux
5. Vérifiez que tout est visible et jouable

### Points à Vérifier
- [ ] Modales centrées
- [ ] Boutons cliquables au doigt
- [ ] Pas d'éléments cachés hors écran
- [ ] 2048 jouable avec touches (si clavier)
- [ ] Réaction au toucher (réaction game)

---

## 🐛 Si Quelque Chose Ne Marche Pas

### Erreur: "Games.css not found"
```powershell
# Redémarrez le serveur
Ctrl+C  # Arrêter
npm run dev  # Relancer
```

### Erreur: "Games module not found"
```
Vérifiez: src/components/Games.tsx existe
Vérifiez: src/components/Games.css existe
```

### Les jeux ne répondent pas
```
1. F12 → Console
2. Cherchez les erreurs rouges
3. Prendre screenshot et partager
```

### Styles bizarres
```powershell
# Videz le cache
rm -r node_modules
npm install
npm run dev
```

---

## 📸 Screenshots à Prendre

1. **Page Divertissement**
   - Onglets YouTube, TikTok, Jeux
   - Les 3 cartes de jeux

2. **2048**
   - Grille de jeu
   - Score visible
   - Quelques mouvements

3. **Reaction Test**
   - Feu rouge
   - Feu vert
   - Temps affiché

4. **Trivia**
   - Une question avec 4 réponses
   - Score affiché
   - Réponse correcte en vert

---

## 🎬 Video Test (optionnel)

Enregistrer un court vidéo montrant:
1. Navigation jusqu'aux jeux (5 sec)
2. Jouer rapidement à 2048 (10 sec)
3. Tester la réaction (10 sec)
4. Faire une question trivia (10 sec)

**Durée totale**: ~35 secondes

---

## ✅ Validation Finale

Quand TOUS les tests passent ✅:

```
✅ 2048 joué et scores montent
✅ Reaction Game affiche le temps
✅ Trivia affiche les réponses correctes/faux
✅ Design cohérent et beau
✅ Pas d'erreurs en console
✅ Responsive sur mobile
✅ Code compilé sans erreurs
```

**→ Les jeux sont prêts pour la production! 🚀**

---

## 📞 Questions Courantes

**Q: Je dois redémarrer le serveur à chaque changement?**
A: Non, Vite fait du hot reload automatique.

**Q: Les jeux sauvegardent les scores?**
A: Non (pour l'instant), c'est réinitialisé à chaque nouvelle partie.

**Q: Peut-on jouer à plusieurs?**
A: Non (pour l'instant), c'est single player.

**Q: Comment ajouter plus de jeux?**
A: Créer un nouveau composant dans `src/components/` puis l'ajouter à `Entertainment.tsx`.

---

## 🎉 Résumé

Vous avez maintenant:
- ✅ 3 jeux entièrement fonctionnels
- ✅ Une page "Divertissement" complète
- ✅ Du code TypeScript propre
- ✅ Un design moderne et responsive
- ✅ Prêt pour vos utilisateurs!

**Bon jeu! 🎮**
