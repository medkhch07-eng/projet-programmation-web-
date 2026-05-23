# 🌸 Smart Inventory Assistant - MERN Stack

## 📋 Description du Projet

**Smart Inventory Assistant** est une application web complète développée avec le stack MERN (MongoDB, Express.js, React, Node.js) pour la gestion intelligente d'inventaire des petits magasins. L'application offre des fonctionnalités avancées de gestion de stock, de suivi des dettes (système Karni), et d'analyse des ventes avec des alertes en temps réel.

### ✨ Fonctionnalités Principales

#### 📦 Gestion des Produits
- ✅ Ajouter, modifier, supprimer des produits
- ✅ Catégorisation des produits
- ✅ Suivi des quantités en stock
- ✅ Gestion des prix d'achat et de vente
- ✅ Calcul automatique des profits
- ✅ Dates d'expiration avec alertes intelligentes
- ✅ Informations sur les fournisseurs
- ✅ Support des codes-barres

#### 💰 Gestion des Dettes (Karni)
- ✅ Enregistrement des dettes clients
- ✅ Suivi des paiements partiels
- ✅ Alertes pour dettes élevées (>5000 DZD)
- ✅ Détection des dettes en retard
- ✅ Informations clients complètes
- ✅ Notes et descriptions personnalisées

#### 📊 Système de Ventes
- ✅ Enregistrement automatique des ventes
- ✅ Historique complet
- ✅ Statistiques en temps réel
- ✅ Calcul des revenus et profits
- ✅ Support multiple modes de paiement
- ✅ Analyses par période (jour/mois)

#### 🔔 Notifications Intelligentes
- ✅ Alertes produits proches d'expiration (7 jours)
- ✅ Alertes produits expirés
- ✅ Alertes dettes en retard
- ✅ Alertes montants élevés
- ✅ Vérifications automatiques quotidiennes (Cron Jobs)

#### 📈 Tableaux de Bord
- ✅ Vue d'ensemble complète
- ✅ Statistiques en temps réel
- ✅ Graphiques de performance
- ✅ Indicateurs clés (KPIs)

## 🛠️ Technologies Utilisées

### Backend
- **Node.js** - Environnement d'exécution JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **node-cron** - Planification de tâches automatiques
- **CORS** - Gestion des requêtes cross-origin

### Frontend
- **React** - Bibliothèque UI
- **React Router** - Navigation
- **Axios** - Requêtes HTTP
- **React Icons** - Icônes

### Design
- **CSS3** - Styles personnalisés
- **Design Moderne** - Couleurs de printemps
- **Responsive** - Compatible mobile et desktop
- **Animations** - Transitions fluides

## 📁 Structure du Projet

```
smart-inventory-mern/
│
├── backend/
│   ├── models/
│   │   ├── Product.js       # Modèle Produit
│   │   ├── Debt.js          # Modèle Dette
│   │   └── Sale.js          # Modèle Vente
│   │
│   ├── routes/
│   │   ├── productRoutes.js # Routes API Produits
│   │   ├── debtRoutes.js    # Routes API Dettes
│   │   └── salesRoutes.js   # Routes API Ventes
│   │
│   ├── server.js            # Serveur Express principal
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── public/
    │   └── index.html
    │
    ├── src/
    │   ├── pages/
    │   │   ├── Home.js          # Page d'accueil
    │   │   ├── Products.js      # Gestion produits
    │   │   ├── Debts.js         # Gestion dettes
    │   │   ├── Sales.js         # Historique ventes
    │   │   └── Notifications.js # Centre d'alertes
    │   │
    │   ├── App.js              # Composant principal
    │   ├── App.css             # Styles globaux
    │   └── index.js
    │
    └── package.json
```

## 🚀 Installation et Configuration

### Prérequis

1. **Node.js** (version 14 ou supérieure)
   - Téléchargez depuis: https://nodejs.org/

2. **MongoDB** (version 4.4 ou supérieure)
   - **Option 1 - Installation locale:**
     - Windows: https://www.mongodb.com/try/download/community
     - Ou utilisez MongoDB Compass (interface graphique)
   
   - **Option 2 - MongoDB Atlas (Cloud - Recommandé):**
     - Créez un compte gratuit: https://www.mongodb.com/cloud/atlas
     - Créez un cluster gratuit
     - Récupérez votre connection string

3. **VS Code** (recommandé)
   - Téléchargez depuis: https://code.visualstudio.com/

### Installation Étape par Étape

#### 1. Décompresser le Projet
```bash
# Extraire le fichier ZIP dans un dossier de votre choix
```

#### 2. Installation du Backend

```bash
# Ouvrir un terminal dans le dossier du projet
cd smart-inventory-mern/backend

# Installer les dépendances
npm install

# Le backend utilisera MongoDB sur localhost:27017
# Si vous utilisez MongoDB Atlas, modifiez le fichier server.js ligne 12:
# mongoose.connect("votre-connection-string-mongodb-atlas")
```

#### 3. Installation du Frontend

```bash
# Ouvrir un NOUVEAU terminal
cd smart-inventory-mern/frontend

# Installer les dépendances
npm install
```

#### 4. Démarrage de MongoDB (si installation locale)

**Windows:**
```bash
# MongoDB doit être démarré en tant que service
# Ou lancez manuellement:
mongod
```

**Ou utilisez MongoDB Compass:**
- Lancez MongoDB Compass
- Connectez-vous à localhost:27017

#### 5. Démarrage de l'Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Le serveur démarre sur: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
L'application s'ouvre automatiquement sur: http://localhost:3000

## 🎯 Utilisation de l'Application

### 1. Page d'Accueil
- Vue d'ensemble des statistiques
- Liens rapides vers toutes les sections
- Alertes importantes affichées

### 2. Gestion des Produits
- Cliquez sur "Produits" dans le menu
- Ajoutez un nouveau produit avec le bouton "+"
- Remplissez tous les champs requis
- Utilisez le bouton "Vendre" pour enregistrer une vente
- Modifiez ou supprimez des produits avec les icônes

### 3. Gestion des Dettes
- Cliquez sur "Dettes (Karni)" dans le menu
- Ajoutez une nouvelle dette
- Filtrez par: Toutes, Non payées, En retard, Montant élevé
- Enregistrez des paiements partiels ou complets

### 4. Visualisation des Ventes
- Cliquez sur "Ventes" dans le menu
- Consultez l'historique complet
- Filtrez par période
- Analysez les statistiques

### 5. Centre de Notifications
- Cliquez sur "Alertes" dans le menu
- Consultez tous les produits à surveiller
- Vérifiez les dettes problématiques

## 🤖 Fonctionnalités Automatiques (Cron Jobs)

L'application effectue automatiquement:

1. **Vérification quotidienne à 9h00:**
   - Scan des produits proches d'expiration
   - Logs dans la console du serveur

2. **Vérification quotidienne à 18h00:**
   - Scan des dettes dépassant la limite
   - Logs dans la console du serveur

## 🎨 Palette de Couleurs (Printemps)

- 🟢 **Vert Printemps:** #4ade80 (Succès, Produits)
- 🌸 **Rose:** #fb7185 (Dettes, Alertes)
- 🌼 **Jaune:** #fbbf24 (Avertissements, Profits)
- 💙 **Bleu:** #60a5fa (Ventes, Informations)
- 💜 **Violet:** #c084fc (Statistiques)

## 📊 API Endpoints

### Produits
```
GET    /api/products              # Tous les produits
GET    /api/products/expiring     # Proches d'expiration
GET    /api/products/expired      # Expirés
GET    /api/products/:id          # Un produit
POST   /api/products              # Créer
PUT    /api/products/:id          # Modifier
DELETE /api/products/:id          # Supprimer
POST   /api/products/:id/sell     # Vendre
GET    /api/products/stats/overview # Statistiques
```

### Dettes
```
GET    /api/debts                 # Toutes les dettes
GET    /api/debts/unpaid          # Non payées
GET    /api/debts/overdue         # En retard
GET    /api/debts/high            # Montant élevé
GET    /api/debts/:id             # Une dette
POST   /api/debts                 # Créer
PUT    /api/debts/:id             # Modifier
DELETE /api/debts/:id             # Supprimer
POST   /api/debts/:id/pay         # Payer
GET    /api/debts/stats/overview  # Statistiques
```

### Ventes
```
GET    /api/sales                 # Toutes les ventes
GET    /api/sales/today           # Ventes du jour
GET    /api/sales/:id             # Une vente
DELETE /api/sales/:id             # Supprimer
GET    /api/sales/stats/overview  # Statistiques
GET    /api/sales/stats/daily     # Données graphique
```

## 🐛 Dépannage

### MongoDB ne démarre pas
- Vérifiez que MongoDB est installé
- Vérifiez que le port 27017 est libre
- Utilisez MongoDB Atlas comme alternative

### Le frontend ne se connecte pas au backend
- Vérifiez que le backend tourne sur le port 5000
- Vérifiez CORS dans server.js
- Vérifiez l'URL de l'API dans les fichiers React

### Erreur de dépendances
```bash
# Supprimez node_modules et réinstallez
rm -rf node_modules
npm install
```

## 📝 Notes Importantes

- ⚠️ **XAMPP n'est PAS nécessaire** pour ce projet (MongoDB remplace MySQL)
- ✅ Tous les boutons sont fonctionnels
- ✅ Navigation entre pages opérationnelle
- ✅ Design moderne avec couleurs de printemps
- ✅ Responsive sur tous les appareils

## 👨‍💻 Développement

Le projet respecte toutes les exigences du TP:
- ✅ Stack MERN complet
- ✅ REST API fonctionnelle
- ✅ CRUD operations sur tous les modèles
- ✅ Interface React avec routing
- ✅ Communication Frontend/Backend
- ✅ MongoDB avec Mongoose
- ✅ Fonctionnalités avancées (Cron Jobs, Alertes)

## 📧 Support

Pour toute question, consultez:
- Documentation MongoDB: https://docs.mongodb.com/
- Documentation React: https://react.dev/
- Documentation Express: https://expressjs.com/

## 🎓 Auteur

Projet réalisé dans le cadre du TP "Development of a Full Application using the MERN Stack" - Module: Advanced Web Development

---

**Bon développement! 🚀🌸**
