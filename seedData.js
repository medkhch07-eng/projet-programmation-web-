const mongoose = require("mongoose");
require("dotenv").config();

// Importer les modèles
const Product = require("./models/Product");
const Debt = require("./models/Debt");
const Sale = require("./models/Sale");

// Se connecter à MongoDB
mongoose.connect("mongodb://localhost:27017/smartinventory")
  .then(() => console.log("✅ MongoDB connecté pour l'insertion de données"))
  .catch(err => {
    console.log("❌ Erreur de connexion MongoDB:", err);
    process.exit(1);
  });

// Fonction pour générer une date aléatoire
const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Fonction pour générer une date future
const futureDate = (minDays, maxDays) => {
  const today = new Date();
  const days = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
  const future = new Date(today);
  future.setDate(future.getDate() + days);
  return future;
};

// DONNÉES DE PRODUITS RÉALISTES (Magasin algérien)
const productsData = [
  // Produits laitiers
  { name: "Lait Frais Candia 1L", category: "Produits laitiers", quantity: 45, purchasePrice: 80, sellingPrice: 100, expirationDate: futureDate(3, 7), supplier: "Candia Algérie", barcode: "6111012345001" },
  { name: "Lait Frais Soummam 1L", category: "Produits laitiers", quantity: 38, purchasePrice: 85, sellingPrice: 105, expirationDate: futureDate(2, 5), supplier: "Soummam", barcode: "6111012345002" },
  { name: "Yaourt Nature Danone x4", category: "Produits laitiers", quantity: 60, purchasePrice: 120, sellingPrice: 150, expirationDate: futureDate(5, 10), supplier: "Danone Djurdjura", barcode: "6111012345003" },
  { name: "Yaourt Activia Fraise x4", category: "Produits laitiers", quantity: 42, purchasePrice: 140, sellingPrice: 180, expirationDate: futureDate(4, 8), supplier: "Danone Djurdjura", barcode: "6111012345004" },
  { name: "Fromage Vache qui Rit 8 portions", category: "Produits laitiers", quantity: 30, purchasePrice: 200, sellingPrice: 250, expirationDate: futureDate(20, 40), supplier: "Bel Algérie", barcode: "6111012345005" },
  { name: "L'ben Soummam 1L", category: "Produits laitiers", quantity: 25, purchasePrice: 70, sellingPrice: 90, expirationDate: futureDate(2, 4), supplier: "Soummam", barcode: "6111012345006" },
  { name: "Beurre Ramy 250g", category: "Produits laitiers", quantity: 15, purchasePrice: 280, sellingPrice: 350, expirationDate: futureDate(30, 60), supplier: "Ramy", barcode: "6111012345007" },
  
  // Boissons
  { name: "Coca-Cola 1.5L", category: "Boissons", quantity: 72, purchasePrice: 90, sellingPrice: 120, expirationDate: futureDate(180, 365), supplier: "Coca-Cola Algérie", barcode: "6111022345001" },
  { name: "Fanta Orange 1.5L", category: "Boissons", quantity: 55, purchasePrice: 85, sellingPrice: 115, expirationDate: futureDate(180, 365), supplier: "Coca-Cola Algérie", barcode: "6111022345002" },
  { name: "Sprite 1.5L", category: "Boissons", quantity: 48, purchasePrice: 85, sellingPrice: 115, expirationDate: futureDate(180, 365), supplier: "Coca-Cola Algérie", barcode: "6111022345003" },
  { name: "Hamoud Boualem Slim 1L", category: "Boissons", quantity: 60, purchasePrice: 70, sellingPrice: 90, expirationDate: futureDate(150, 300), supplier: "Hamoud Boualem", barcode: "6111022345004" },
  { name: "Ifri Orange 1.5L", category: "Boissons", quantity: 50, purchasePrice: 65, sellingPrice: 85, expirationDate: futureDate(120, 240), supplier: "Ifri", barcode: "6111022345005" },
  { name: "Eau Minérale Ifri 1.5L", category: "Boissons", quantity: 120, purchasePrice: 30, sellingPrice: 40, expirationDate: futureDate(300, 500), supplier: "Ifri", barcode: "6111022345006" },
  { name: "Jus Rouiba Orange 1L", category: "Boissons", quantity: 40, purchasePrice: 110, sellingPrice: 140, expirationDate: futureDate(60, 120), supplier: "Rouiba", barcode: "6111022345007" },
  { name: "Jus Rouiba Cocktail 1L", category: "Boissons", quantity: 35, purchasePrice: 115, sellingPrice: 145, expirationDate: futureDate(60, 120), supplier: "Rouiba", barcode: "6111022345008" },
  
  // Alimentation de base
  { name: "Pain de Mie Edough", category: "Alimentation", quantity: 28, purchasePrice: 50, sellingPrice: 70, expirationDate: futureDate(3, 7), supplier: "Edough", barcode: "6111032345001" },
  { name: "Huile Tournesol Elio 2L", category: "Alimentation", quantity: 20, purchasePrice: 450, sellingPrice: 550, expirationDate: futureDate(180, 365), supplier: "Cevital", barcode: "6111032345002" },
  { name: "Huile d'Olive Ifri 1L", category: "Alimentation", quantity: 12, purchasePrice: 650, sellingPrice: 850, expirationDate: futureDate(365, 600), supplier: "Ifri", barcode: "6111032345003" },
  { name: "Sucre Blanc Cevital 1kg", category: "Alimentation", quantity: 50, purchasePrice: 80, sellingPrice: 100, expirationDate: futureDate(365, 730), supplier: "Cevital", barcode: "6111032345004" },
  { name: "Semoule Fine 1kg", category: "Alimentation", quantity: 35, purchasePrice: 70, sellingPrice: 90, expirationDate: futureDate(180, 365), supplier: "Eriad", barcode: "6111032345005" },
  { name: "Pâtes Tria 500g", category: "Alimentation", quantity: 60, purchasePrice: 50, sellingPrice: 65, expirationDate: futureDate(300, 500), supplier: "Tria", barcode: "6111032345006" },
  { name: "Riz Tassili 1kg", category: "Alimentation", quantity: 40, purchasePrice: 180, sellingPrice: 220, expirationDate: futureDate(365, 600), supplier: "Tassili", barcode: "6111032345007" },
  { name: "Farine Supérieure 1kg", category: "Alimentation", quantity: 45, purchasePrice: 60, sellingPrice: 80, expirationDate: futureDate(180, 300), supplier: "Eriad", barcode: "6111032345008" },
  { name: "Couscous Moyen 1kg", category: "Alimentation", quantity: 30, purchasePrice: 90, sellingPrice: 120, expirationDate: futureDate(180, 365), supplier: "Ferrero", barcode: "6111032345009" },
  
  // Conserves
  { name: "Concentré Tomate Le Soleil 70g", category: "Conserves", quantity: 80, purchasePrice: 35, sellingPrice: 50, expirationDate: futureDate(365, 600), supplier: "Le Soleil", barcode: "6111042345001" },
  { name: "Concentré Tomate Uno 210g", category: "Conserves", quantity: 50, purchasePrice: 85, sellingPrice: 110, expirationDate: futureDate(365, 600), supplier: "Uno", barcode: "6111042345002" },
  { name: "Thon à l'huile Nador", category: "Conserves", quantity: 45, purchasePrice: 150, sellingPrice: 190, expirationDate: futureDate(500, 800), supplier: "Nador", barcode: "6111042345003" },
  { name: "Sardines à l'huile Belle Vue", category: "Conserves", quantity: 40, purchasePrice: 120, sellingPrice: 150, expirationDate: futureDate(500, 800), supplier: "Belle Vue", barcode: "6111042345004" },
  { name: "Haricots Blancs 800g", category: "Conserves", quantity: 35, purchasePrice: 100, sellingPrice: 130, expirationDate: futureDate(400, 700), supplier: "Conserves Algériennes", barcode: "6111042345005" },
  { name: "Petits Pois Carotte 800g", category: "Conserves", quantity: 38, purchasePrice: 110, sellingPrice: 140, expirationDate: futureDate(400, 700), supplier: "Conserves Algériennes", barcode: "6111042345006" },
  
  // Hygiène
  { name: "Savon Dove 90g", category: "Hygiène", quantity: 50, purchasePrice: 80, sellingPrice: 110, expirationDate: futureDate(500, 1000), supplier: "Unilever", barcode: "6111052345001" },
  { name: "Shampooing Palmolive 350ml", category: "Hygiène", quantity: 30, purchasePrice: 250, sellingPrice: 320, expirationDate: futureDate(400, 800), supplier: "Palmolive", barcode: "6111052345002" },
  { name: "Dentifrice Signal 75ml", category: "Hygiène", quantity: 35, purchasePrice: 150, sellingPrice: 200, expirationDate: futureDate(500, 900), supplier: "Signal", barcode: "6111052345003" },
  { name: "Papier Toilette Ouatine x4", category: "Hygiène", quantity: 60, purchasePrice: 180, sellingPrice: 230, expirationDate: futureDate(700, 1200), supplier: "Ouatine", barcode: "6111052345004" },
  { name: "Lessive Ariel 1.5kg", category: "Hygiène", quantity: 25, purchasePrice: 450, sellingPrice: 580, expirationDate: futureDate(500, 900), supplier: "P&G", barcode: "6111052345005" },
  
  // Produits avec dates courtes (pour tester les alertes)
  { name: "Pain Frais (Expire bientôt!)", category: "Alimentation", quantity: 15, purchasePrice: 30, sellingPrice: 40, expirationDate: futureDate(1, 3), supplier: "Boulangerie Locale", barcode: "6111062345001", notes: "Vérifier quotidiennement" },
  { name: "Viande Hachée Fraîche (Expire bientôt!)", category: "Alimentation", quantity: 8, purchasePrice: 800, sellingPrice: 1000, expirationDate: futureDate(1, 2), supplier: "Boucher Local", barcode: "6111062345002", notes: "Conserver au frais" },
  { name: "Salade Verte (Expire bientôt!)", category: "Alimentation", quantity: 12, purchasePrice: 50, sellingPrice: 80, expirationDate: futureDate(2, 4), supplier: "Maraîcher", barcode: "6111062345003", notes: "Produit frais" },
  
  // Produits expirés (pour tester les alertes)
  { name: "Yaourt Périmé Test", category: "Produits laitiers", quantity: 6, purchasePrice: 100, sellingPrice: 130, expirationDate: new Date("2026-04-20"), supplier: "Test", barcode: "6111072345001", notes: "ATTENTION: Produit expiré à retirer" },
  { name: "Jus Périmé Test", category: "Boissons", quantity: 4, purchasePrice: 80, sellingPrice: 100, expirationDate: new Date("2026-04-15"), supplier: "Test", barcode: "6111072345002", notes: "ATTENTION: Produit expiré" }
];

// DONNÉES DE DETTES RÉALISTES
const debtsData = [
  // Dettes normales
  { customerName: "Ahmed Benali", customerPhone: "0555123456", amount: 2500, paidAmount: 0, description: "Achats du 15 avril", dueDate: futureDate(10, 20), notes: "Client régulier, bon payeur" },
  { customerName: "Fatima Meziane", customerPhone: "0666789012", amount: 1800, paidAmount: 500, description: "Achats hebdomadaires", dueDate: futureDate(15, 25), notes: "Paiement partiel reçu" },
  { customerName: "Karim Saidi", customerPhone: "0777345678", amount: 3200, paidAmount: 0, description: "Courses du mois", dueDate: futureDate(5, 15), notes: "À rappeler la semaine prochaine" },
  { customerName: "Meriem Larbi", customerPhone: "0555987654", amount: 4100, paidAmount: 2000, description: "Achats pour fête familiale", dueDate: futureDate(20, 30), notes: "Paie régulièrement" },
  { customerName: "Rachid Boudiaf", customerPhone: "0666111222", amount: 1500, paidAmount: 0, description: "Achats du 20 avril", dueDate: futureDate(12, 22), notes: "Nouveau client" },
  
  // Dette à montant élevé (pour alerte)
  { customerName: "Mohammed Khelif", customerPhone: "0777888999", amount: 6500, paidAmount: 1000, description: "Achats en gros pour épicerie", dueDate: futureDate(25, 35), notes: "ATTENTION: Montant élevé - Suivi rapproché" },
  { customerName: "Salim Bencheikh", customerPhone: "0555444333", amount: 7200, paidAmount: 0, description: "Stock pour restaurant", dueDate: futureDate(30, 40), notes: "ATTENTION: Montant très élevé" },
  
  // Dettes en retard (pour alerte)
  { customerName: "Nassim Zerrouki", customerPhone: "0666555444", amount: 2200, paidAmount: 0, description: "Achats du 10 avril", dueDate: new Date("2026-04-22"), notes: "EN RETARD - Relancer immédiatement" },
  { customerName: "Amina Bouzid", customerPhone: "0777666555", amount: 1900, paidAmount: 500, description: "Achats du 5 avril", dueDate: new Date("2026-04-20"), notes: "EN RETARD - Paiement partiel effectué" },
  { customerName: "Hocine Mameri", customerPhone: "0555222111", amount: 3500, paidAmount: 0, description: "Achats du 1er avril", dueDate: new Date("2026-04-18"), notes: "EN RETARD DEPUIS LONGTEMPS - Action urgente" },
  
  // Autres dettes
  { customerName: "Leila Hamdi", customerPhone: "0666333222", amount: 2800, paidAmount: 1500, description: "Achats réguliers", dueDate: futureDate(18, 28), notes: "Bonne relation client" },
  { customerName: "Youcef Taleb", customerPhone: "0777999888", amount: 1200, paidAmount: 0, description: "Achats du 18 avril", dueDate: futureDate(8, 18), notes: "Client occasionnel" },
  { customerName: "Samia Aït Ali", customerPhone: "0555777666", amount: 3600, paidAmount: 3600, description: "Achats du 12 avril - PAYÉE", dueDate: new Date("2026-04-25"), notes: "Dette intégralement payée", paid: true, paidDate: new Date("2026-04-23") },
  { customerName: "Bilal Moussaoui", customerPhone: "0666888777", amount: 2100, paidAmount: 2100, description: "Achats du 8 avril - PAYÉE", dueDate: new Date("2026-04-20"), notes: "Paiement effectué", paid: true, paidDate: new Date("2026-04-19") }
];

// DONNÉES DE VENTES (Historique réaliste)
const salesData = [
  // Ventes d'aujourd'hui
  { productName: "Lait Frais Candia 1L", quantitySold: 3, purchasePrice: 80, sellingPrice: 100, totalRevenue: 300, totalProfit: 60, saleDate: new Date(), customerName: "Client direct", paymentMethod: "Espèces" },
  { productName: "Coca-Cola 1.5L", quantitySold: 5, purchasePrice: 90, sellingPrice: 120, totalRevenue: 600, totalProfit: 150, saleDate: new Date(), customerName: "Client direct", paymentMethod: "Espèces" },
  { productName: "Pain de Mie Edough", quantitySold: 2, purchasePrice: 50, sellingPrice: 70, totalRevenue: 140, totalProfit: 40, saleDate: new Date(), customerName: "Client direct", paymentMethod: "Espèces" },
  { productName: "Yaourt Nature Danone x4", quantitySold: 4, purchasePrice: 120, sellingPrice: 150, totalRevenue: 600, totalProfit: 120, saleDate: new Date(), customerName: "Mme Benali", paymentMethod: "Karni" },
  { productName: "Eau Minérale Ifri 1.5L", quantitySold: 6, purchasePrice: 30, sellingPrice: 40, totalRevenue: 240, totalProfit: 60, saleDate: new Date(), customerName: "Client direct", paymentMethod: "Espèces" },
  
  // Ventes d'hier
  { productName: "Huile Tournesol Elio 2L", quantitySold: 2, purchasePrice: 450, sellingPrice: 550, totalRevenue: 1100, totalProfit: 200, saleDate: new Date(Date.now() - 86400000), customerName: "M. Karim", paymentMethod: "Carte" },
  { productName: "Sucre Blanc Cevital 1kg", quantitySold: 3, purchasePrice: 80, sellingPrice: 100, totalRevenue: 300, totalProfit: 60, saleDate: new Date(Date.now() - 86400000), customerName: "Client direct", paymentMethod: "Espèces" },
  { productName: "Pâtes Tria 500g", quantitySold: 5, purchasePrice: 50, sellingPrice: 65, totalRevenue: 325, totalProfit: 75, saleDate: new Date(Date.now() - 86400000), customerName: "Mme Fatima", paymentMethod: "Karni" },
  
  // Ventes de la semaine
  { productName: "Fromage Vache qui Rit", quantitySold: 4, purchasePrice: 200, sellingPrice: 250, totalRevenue: 1000, totalProfit: 200, saleDate: new Date(Date.now() - 172800000), customerName: "Client direct", paymentMethod: "Espèces" },
  { productName: "Jus Rouiba Orange 1L", quantitySold: 3, purchasePrice: 110, sellingPrice: 140, totalRevenue: 420, totalProfit: 90, saleDate: new Date(Date.now() - 259200000), customerName: "M. Ahmed", paymentMethod: "Carte" },
  { productName: "Thon à l'huile Nador", quantitySold: 6, purchasePrice: 150, sellingPrice: 190, totalRevenue: 1140, totalProfit: 240, saleDate: new Date(Date.now() - 345600000), customerName: "Restaurant Le Palmier", paymentMethod: "Carte" },
  { productName: "Riz Tassili 1kg", quantitySold: 4, purchasePrice: 180, sellingPrice: 220, totalRevenue: 880, totalProfit: 160, saleDate: new Date(Date.now() - 432000000), customerName: "Mme Leila", paymentMethod: "Karni" },
  
  // Ventes du mois
  { productName: "Concentré Tomate Uno 210g", quantitySold: 10, purchasePrice: 85, sellingPrice: 110, totalRevenue: 1100, totalProfit: 250, saleDate: new Date(Date.now() - 604800000), customerName: "Épicerie du Coin", paymentMethod: "Carte" },
  { productName: "Lessive Ariel 1.5kg", quantitySold: 3, purchasePrice: 450, sellingPrice: 580, totalRevenue: 1740, totalProfit: 390, saleDate: new Date(Date.now() - 691200000), customerName: "Client direct", paymentMethod: "Espèces" },
  { productName: "Shampooing Palmolive 350ml", quantitySold: 5, purchasePrice: 250, sellingPrice: 320, totalRevenue: 1600, totalProfit: 350, saleDate: new Date(Date.now() - 777600000), customerName: "Mme Samia", paymentMethod: "Carte" }
];

// FONCTION PRINCIPALE D'INSERTION
const seedDatabase = async () => {
  try {
    console.log("\n🌱 DÉBUT DE L'INSERTION DES DONNÉES...\n");
    
    // ÉTAPE 1: Nettoyer les anciennes données
    console.log("🧹 Nettoyage des anciennes données...");
    await Product.deleteMany({});
    console.log("   ✅ Anciens produits supprimés");
    
    await Debt.deleteMany({});
    console.log("   ✅ Anciennes dettes supprimées");
    
    await Sale.deleteMany({});
    console.log("   ✅ Anciennes ventes supprimées");
    
    console.log("\n");
    
    // ÉTAPE 2: Insérer les produits
    console.log("📦 Insertion des produits...");
    const products = await Product.insertMany(productsData);
    console.log(`   ✅ ${products.length} produits insérés avec succès`);
    
    // ÉTAPE 3: Insérer les dettes
    console.log("\n💰 Insertion des dettes...");
    const debts = await Debt.insertMany(debtsData);
    console.log(`   ✅ ${debts.length} dettes insérées avec succès`);
    
    // ÉTAPE 4: Insérer les ventes
    console.log("\n📊 Insertion des ventes...");
    const sales = await Sale.insertMany(salesData);
    console.log(`   ✅ ${sales.length} ventes insérées avec succès`);
    
    // ÉTAPE 5: Afficher les statistiques
    console.log("\n");
    console.log("═══════════════════════════════════════════════════");
    console.log("       🎉 INSERTION TERMINÉE AVEC SUCCÈS ! 🎉       ");
    console.log("═══════════════════════════════════════════════════");
    console.log("\n📊 STATISTIQUES DES DONNÉES INSÉRÉES:");
    console.log("─────────────────────────────────────────────────");
    console.log(`   Produits:    ${products.length}`);
    console.log(`   Dettes:      ${debts.length}`);
    console.log(`   Ventes:      ${sales.length}`);
    console.log("─────────────────────────────────────────────────");
    
    // Calculer les statistiques
    const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);
    const stockValue = products.reduce((sum, p) => sum + (p.purchasePrice * p.quantity), 0);
    const potentialRevenue = products.reduce((sum, p) => sum + (p.sellingPrice * p.quantity), 0);
    const totalDebts = debts.reduce((sum, d) => sum + d.amount, 0);
    const unpaidDebts = debts.filter(d => !d.paid).reduce((sum, d) => sum + (d.amount - d.paidAmount), 0);
    const totalSalesRevenue = sales.reduce((sum, s) => sum + s.totalRevenue, 0);
    const totalProfit = sales.reduce((sum, s) => sum + s.totalProfit, 0);
    
    console.log("\n💼 RÉSUMÉ FINANCIER:");
    console.log("─────────────────────────────────────────────────");
    console.log(`   Articles en stock:      ${totalStock} unités`);
    console.log(`   Valeur du stock:        ${stockValue.toFixed(2)} DZD`);
    console.log(`   Revenus potentiels:     ${potentialRevenue.toFixed(2)} DZD`);
    console.log(`   Dettes totales:         ${totalDebts.toFixed(2)} DZD`);
    console.log(`   Montant non payé:       ${unpaidDebts.toFixed(2)} DZD`);
    console.log(`   Revenus des ventes:     ${totalSalesRevenue.toFixed(2)} DZD`);
    console.log(`   Profits générés:        ${totalProfit.toFixed(2)} DZD`);
    console.log("─────────────────────────────────────────────────");
    
    console.log("\n🔔 ALERTES ACTIVES:");
    console.log("─────────────────────────────────────────────────");
    const expiringSoon = products.filter(p => {
      const days = Math.ceil((p.expirationDate - new Date()) / (1000 * 60 * 60 * 24));
      return days <= 7 && days >= 0;
    }).length;
    const expired = products.filter(p => p.expirationDate < new Date()).length;
    const overdueDebts = debts.filter(d => !d.paid && d.dueDate < new Date()).length;
    const highDebts = debts.filter(d => !d.paid && d.amount >= 5000).length;
    
    console.log(`   ⚠️  Produits expirant bientôt:  ${expiringSoon}`);
    console.log(`   ❌ Produits expirés:            ${expired}`);
    console.log(`   🚨 Dettes en retard:            ${overdueDebts}`);
    console.log(`   💰 Dettes montant élevé:        ${highDebts}`);
    console.log("─────────────────────────────────────────────────");
    
    console.log("\n✨ Votre base de données est maintenant remplie !");
    console.log("🌐 Ouvrez http://localhost:3000 pour voir vos données\n");
    
    // Fermer la connexion
    await mongoose.connection.close();
    console.log("🔌 Connexion MongoDB fermée\n");
    process.exit(0);
    
  } catch (error) {
    console.error("\n❌ ERREUR lors de l'insertion:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Lancer le script
seedDatabase();
