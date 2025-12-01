# Expérimentations Géométriques & Artistiques

Ce dépôt contient des créations d'art génératif réalisées avec **HTML5 Canvas** et **JavaScript**. Il explore des figures géométriques complexes (Hypotrochoïdes) avec un rendu stylisé "Néon".

**Auteur :** Anas Bounabat  
**Basé sur le template :** [v3ga/nouveaux_dessins_geometriques_et_artistiques](https://github.com/v3ga/nouveaux_dessins_geometriques_et_artistiques)

---

## 📂 Structure du projet

Le projet est organisé en dossiers distincts pour assurer une séparation propre du code et des ressources :

* **📁 projet1/** : **Rosace Néon Complexe (Multicolore)**
    * Contient le code source (HTML, CSS, JS séparés) de la première animation.
    * *Caractéristiques :* Dégradé de couleurs (Cyan, Magenta, Orange) et haute densité de traits.

* **📁 projet2/** : **Rosace Néon Bleu (Unique)**
    * Contient le code source (HTML, CSS, JS séparés) de la deuxième animation.
    * *Caractéristiques :* Teinte monochrome bleu électrique et paramètres géométriques différents.

* **📁 images/** : **Exportations**
    * Contient les rendus statiques des projets.
    * Formats disponibles : `.png` (Image pixel) et `.svg` (Vectoriel).

---

## 🛠️ Détails Techniques

Chaque projet respecte les bonnes pratiques de développement web :

1.  **Séparation des fichiers :** Le code est structuré en fichiers `.html`, `.css`, et `.js` distincts.
2.  **Responsive Design :** Les animations s'adaptent automatiquement à la taille de la fenêtre du navigateur (`window.addEventListener('resize')`).
3.  **Rendu Graphique :**
    * Utilisation de l'API Canvas 2D.
    * Effet de lueur (Glow) via `shadowBlur`.
    * Mode de fusion `globalCompositeOperation = 'lighter'` pour créer des intensités lumineuses aux intersections.

## 🚀 Comment utiliser

1.  Clonez ce dépôt ou téléchargez les fichiers.
2.  Ouvrez le fichier `index.html` situé dans le dossier **projet1** ou **projet2** avec n'importe quel navigateur web moderne (Chrome, Firefox, Safari).
3.  Admirez l'animation générée en temps réel.
