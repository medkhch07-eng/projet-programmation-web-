/**
 * ============================================================
 *  SCRIPT DE SEED - Smart Inventory MERN
 *  Données réalistes pour un magasin d'épicerie algérien
 * ============================================================
 *
 *  UTILISATION :
 *    1. Copiez ce fichier dans le dossier backend/ de votre projet
 *    2. Installez mongoose si pas déjà fait : npm install mongoose
 *    3. Lancez : node seed.js
 *
 *  Ce script va :
 *    - Effacer toutes les données existantes (products, sales, debts)
 *    - Insérer 40 produits, 60 ventes et 15 dettes
 * ============================================================
 */

const mongoose = require("mongoose");

// ─── Connexion MongoDB ────────────────────────────────────────
const MONGODB_URI = "mongodb://localhost:27017/smartinventory";

// ─── Schémas (copie de vos modèles pour éviter les imports) ──

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Alimentation", "Boissons", "Produits laitiers", "Conserves", "Hygiène", "Autre"],
  },
  quantity: { type: Number, required: true, min: 0 },
  purchasePrice: { type: Number, required: true, min: 0 },
  sellingPrice: { type: Number, required: true, min: 0 },
  expirationDate: { type: Date, required: true },
  supplier: { type: String, default: "" },
  barcode: { type: String, default: "" },
  sold: { type: Boolean, default: false },
  soldDate: { type: Date },
  notes: { type: String, default: "" },
}, { timestamps: true });

const SaleSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  productName: { type: String, required: true },
  quantitySold: { type: Number, required: true, min: 1 },
  purchasePrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  totalRevenue: { type: Number, required: true },
  totalProfit: { type: Number, required: true },
  saleDate: { type: Date, default: Date.now },
  customerName: { type: String, default: "Client direct" },
  paymentMethod: { type: String, enum: ["Espèces", "Carte", "Karni"], default: "Espèces" },
}, { timestamps: true });

const DebtSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerPhone: { type: String, default: "" },
  amount: { type: Number, required: true, min: 0 },
  description: { type: String, default: "" },
  dueDate: { type: Date, required: true },
  paid: { type: Boolean, default: false },
  paidDate: { type: Date },
  paidAmount: { type: Number, default: 0 },
  notes: { type: String, default: "" },
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);
const Sale    = mongoose.model("Sale",    SaleSchema);
const Debt    = mongoose.model("Debt",    DebtSchema);

// ─── Helper : générer une date dans N jours à partir d'aujourd'hui ──
function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}

// ─── Helper : générer une date dans le passé ─────────────────
function daysAgo(n) {
  return daysFromNow(-n);
}

// ─────────────────────────────────────────────────────────────
//  1. PRODUITS (40 articles)
//     Mélange de : stock normal, stock faible, proches péremption,
//     périmés (pour tester les notifications), et déjà vendus
// ─────────────────────────────────────────────────────────────
const productsData = [
  // ── Alimentation ──────────────────────────────────────────
  {
    name: "Farine de blé 1kg",
    category: "Alimentation",
    quantity: 80,
    purchasePrice: 90,
    sellingPrice: 120,
    expirationDate: daysFromNow(180),
    supplier: "Minoterie Hadjout",
    barcode: "6191234560001",
    notes: "Marque Rania"
  },
  {
    name: "Semoule fine 1kg",
    category: "Alimentation",
    quantity: 60,
    purchasePrice: 85,
    sellingPrice: 110,
    expirationDate: daysFromNow(160),
    supplier: "Minoterie Hadjout",
    barcode: "6191234560002",
    notes: ""
  },
  {
    name: "Huile de table 1L",
    category: "Alimentation",
    quantity: 45,
    purchasePrice: 280,
    sellingPrice: 340,
    expirationDate: daysFromNow(365),
    supplier: "CEVITAL",
    barcode: "6191234560003",
    notes: "Huile Fleurial"
  },
  {
    name: "Huile de table 5L",
    category: "Alimentation",
    quantity: 20,
    purchasePrice: 1300,
    sellingPrice: 1600,
    expirationDate: daysFromNow(365),
    supplier: "CEVITAL",
    barcode: "6191234560004",
    notes: ""
  },
  {
    name: "Sucre en poudre 1kg",
    category: "Alimentation",
    quantity: 100,
    purchasePrice: 90,
    sellingPrice: 115,
    expirationDate: daysFromNow(730),
    supplier: "CEVITAL",
    barcode: "6191234560005",
    notes: ""
  },
  {
    name: "Riz rond 1kg",
    category: "Alimentation",
    quantity: 55,
    purchasePrice: 130,
    sellingPrice: 170,
    expirationDate: daysFromNow(540),
    supplier: "Général Distribution",
    barcode: "6191234560006",
    notes: ""
  },
  {
    name: "Pâtes coquillettes 500g",
    category: "Alimentation",
    quantity: 3,  // stock faible → notification
    purchasePrice: 60,
    sellingPrice: 85,
    expirationDate: daysFromNow(300),
    supplier: "Pasta DzFood",
    barcode: "6191234560007",
    notes: "Stock à renouveler !"
  },
  {
    name: "Sel de table 1kg",
    category: "Alimentation",
    quantity: 30,
    purchasePrice: 25,
    sellingPrice: 40,
    expirationDate: daysFromNow(1000),
    supplier: "Générique",
    barcode: "6191234560008",
    notes: ""
  },
  {
    name: "Gâteau Bimo 6 pièces",
    category: "Alimentation",
    quantity: 4,  // stock faible
    purchasePrice: 85,
    sellingPrice: 120,
    expirationDate: daysFromNow(5),  // proche péremption !
    supplier: "BIMO",
    barcode: "6191234560009",
    notes: "Urgent : proche péremption ET stock faible"
  },
  {
    name: "Biscuits Digestive 250g",
    category: "Alimentation",
    quantity: 18,
    purchasePrice: 130,
    sellingPrice: 175,
    expirationDate: daysFromNow(90),
    supplier: "SIM",
    barcode: "6191234560010",
    notes: ""
  },
  {
    name: "Maïzena 400g",
    category: "Alimentation",
    quantity: 12,
    purchasePrice: 100,
    sellingPrice: 140,
    expirationDate: daysFromNow(365),
    supplier: "Général Distribution",
    barcode: "6191234560011",
    notes: ""
  },
  {
    name: "Levure chimique 10g",
    category: "Alimentation",
    quantity: 25,
    purchasePrice: 15,
    sellingPrice: 25,
    expirationDate: daysFromNow(200),
    supplier: "Général Distribution",
    barcode: "6191234560012",
    notes: ""
  },
  {
    name: "Pois chiches 500g",
    category: "Alimentation",
    quantity: 0,  // rupture de stock
    purchasePrice: 95,
    sellingPrice: 130,
    expirationDate: daysFromNow(400),
    supplier: "Général Distribution",
    barcode: "6191234560013",
    notes: "Rupture de stock"
  },
  {
    name: "Lentilles 1kg",
    category: "Alimentation",
    quantity: 22,
    purchasePrice: 160,
    sellingPrice: 210,
    expirationDate: daysFromNow(500),
    supplier: "Général Distribution",
    barcode: "6191234560014",
    notes: ""
  },
  // ── Boissons ──────────────────────────────────────────────
  {
    name: "Eau minérale 1.5L",
    category: "Boissons",
    quantity: 120,
    purchasePrice: 40,
    sellingPrice: 60,
    expirationDate: daysFromNow(365),
    supplier: "Lalla Khedidja",
    barcode: "6191234560020",
    notes: ""
  },
  {
    name: "Jus d'orange 1L",
    category: "Boissons",
    quantity: 35,
    purchasePrice: 110,
    sellingPrice: 150,
    expirationDate: daysFromNow(60),
    supplier: "CEVITAL",
    barcode: "6191234560021",
    notes: ""
  },
  {
    name: "Soda Pepsi 330ml",
    category: "Boissons",
    quantity: 48,
    purchasePrice: 55,
    sellingPrice: 80,
    expirationDate: daysFromNow(180),
    supplier: "Pepsi Algérie",
    barcode: "6191234560022",
    notes: ""
  },
  {
    name: "Café Moulu 250g",
    category: "Boissons",
    quantity: 2,  // stock faible
    purchasePrice: 280,
    sellingPrice: 380,
    expirationDate: daysFromNow(270),
    supplier: "Café ABC",
    barcode: "6191234560023",
    notes: ""
  },
  {
    name: "Thé vert sachet x20",
    category: "Boissons",
    quantity: 30,
    purchasePrice: 120,
    sellingPrice: 160,
    expirationDate: daysFromNow(300),
    supplier: "Général Distribution",
    barcode: "6191234560024",
    notes: ""
  },
  {
    name: "Limonade Hamoud 1L",
    category: "Boissons",
    quantity: 60,
    purchasePrice: 70,
    sellingPrice: 100,
    expirationDate: daysFromNow(120),
    supplier: "Hamoud Boualem",
    barcode: "6191234560025",
    notes: "Produit saisonnier"
  },
  // ── Produits laitiers ─────────────────────────────────────
  {
    name: "Lait UHT 1L",
    category: "Produits laitiers",
    quantity: 70,
    purchasePrice: 80,
    sellingPrice: 110,
    expirationDate: daysFromNow(90),
    supplier: "Candia Algérie",
    barcode: "6191234560030",
    notes: ""
  },
  {
    name: "Yaourt nature x4",
    category: "Produits laitiers",
    quantity: 20,
    purchasePrice: 90,
    sellingPrice: 130,
    expirationDate: daysFromNow(20),
    supplier: "Danone Algérie",
    barcode: "6191234560031",
    notes: ""
  },
  {
    name: "Beurre 200g",
    category: "Produits laitiers",
    quantity: 15,
    purchasePrice: 170,
    sellingPrice: 230,
    expirationDate: daysFromNow(60),
    supplier: "GIPLAIT",
    barcode: "6191234560032",
    notes: ""
  },
  {
    name: "Fromage fondu x8",
    category: "Produits laitiers",
    quantity: 3,  // stock faible
    purchasePrice: 120,
    sellingPrice: 165,
    expirationDate: daysFromNow(3),  // très proche péremption !
    supplier: "BEKO",
    barcode: "6191234560033",
    notes: "URGENT : expire dans 3 jours"
  },
  {
    name: "Crème fraîche 200g",
    category: "Produits laitiers",
    quantity: 10,
    purchasePrice: 130,
    sellingPrice: 175,
    expirationDate: daysFromNow(-5), // PÉRIMÉ → pour tester les alertes
    supplier: "Soummam",
    barcode: "6191234560034",
    notes: "ATTENTION : produit périmé depuis 5 jours"
  },
  // ── Conserves ─────────────────────────────────────────────
  {
    name: "Concentré de tomate 200g",
    category: "Conserves",
    quantity: 50,
    purchasePrice: 55,
    sellingPrice: 80,
    expirationDate: daysFromNow(730),
    supplier: "AMOR-AMOR",
    barcode: "6191234560040",
    notes: ""
  },
  {
    name: "Thon en conserve 160g",
    category: "Conserves",
    quantity: 40,
    purchasePrice: 180,
    sellingPrice: 240,
    expirationDate: daysFromNow(1095),
    supplier: "Général Distribution",
    barcode: "6191234560041",
    notes: ""
  },
  {
    name: "Sardines en boîte",
    category: "Conserves",
    quantity: 35,
    purchasePrice: 80,
    sellingPrice: 115,
    expirationDate: daysFromNow(900),
    supplier: "Général Distribution",
    barcode: "6191234560042",
    notes: ""
  },
  {
    name: "Harissa 135g",
    category: "Conserves",
    quantity: 25,
    purchasePrice: 60,
    sellingPrice: 90,
    expirationDate: daysFromNow(540),
    supplier: "Général Distribution",
    barcode: "6191234560043",
    notes: ""
  },
  // ── Hygiène ───────────────────────────────────────────────
  {
    name: "Savon de Marseille",
    category: "Hygiène",
    quantity: 40,
    purchasePrice: 35,
    sellingPrice: 60,
    expirationDate: daysFromNow(1095),
    supplier: "Henkel Algérie",
    barcode: "6191234560050",
    notes: ""
  },
  {
    name: "Dentifrice Colgate 75ml",
    category: "Hygiène",
    quantity: 22,
    purchasePrice: 120,
    sellingPrice: 170,
    expirationDate: daysFromNow(730),
    supplier: "Colgate Algérie",
    barcode: "6191234560051",
    notes: ""
  },
  {
    name: "Shampooing Elsève 200ml",
    category: "Hygiène",
    quantity: 15,
    purchasePrice: 350,
    sellingPrice: 460,
    expirationDate: daysFromNow(730),
    supplier: "L'Oréal Algérie",
    barcode: "6191234560052",
    notes: ""
  },
  {
    name: "Papier hygiénique x6",
    category: "Hygiène",
    quantity: 30,
    purchasePrice: 180,
    sellingPrice: 250,
    expirationDate: daysFromNow(1095),
    supplier: "Général Distribution",
    barcode: "6191234560053",
    notes: ""
  },
  {
    name: "Liquide vaisselle 500ml",
    category: "Hygiène",
    quantity: 2,  // stock très faible
    purchasePrice: 90,
    sellingPrice: 130,
    expirationDate: daysFromNow(540),
    supplier: "Henkel Algérie",
    barcode: "6191234560054",
    notes: ""
  },
  {
    name: "Lessive en poudre 1kg",
    category: "Hygiène",
    quantity: 18,
    purchasePrice: 250,
    sellingPrice: 340,
    expirationDate: daysFromNow(730),
    supplier: "Unilever Algérie",
    barcode: "6191234560055",
    notes: ""
  },
  // ── Autre ─────────────────────────────────────────────────
  {
    name: "Allumettes x10 boîtes",
    category: "Autre",
    quantity: 50,
    purchasePrice: 50,
    sellingPrice: 80,
    expirationDate: daysFromNow(1095),
    supplier: "Général Distribution",
    barcode: "6191234560060",
    notes: ""
  },
  {
    name: "Bougies x6",
    category: "Autre",
    quantity: 30,
    purchasePrice: 40,
    sellingPrice: 70,
    expirationDate: daysFromNow(1095),
    supplier: "Général Distribution",
    barcode: "6191234560061",
    notes: ""
  },
  {
    name: "Sacs plastique x100",
    category: "Autre",
    quantity: 60,
    purchasePrice: 60,
    sellingPrice: 100,
    expirationDate: daysFromNow(1095),
    supplier: "Général Distribution",
    barcode: "6191234560062",
    notes: ""
  },
  {
    name: "Piles AA x4",
    category: "Autre",
    quantity: 20,
    purchasePrice: 120,
    sellingPrice: 180,
    expirationDate: daysFromNow(1095),
    supplier: "Général Distribution",
    barcode: "6191234560063",
    notes: ""
  },
  {
    name: "Cahier 48 pages",
    category: "Autre",
    quantity: 45,
    purchasePrice: 35,
    sellingPrice: 60,
    expirationDate: daysFromNow(1095),
    supplier: "Général Distribution",
    barcode: "6191234560064",
    notes: ""
  },
];

// ─────────────────────────────────────────────────────────────
//  2. DETTES (15 clients)
// ─────────────────────────────────────────────────────────────
const debtsData = [
  // Dettes en cours (non payées)
  {
    customerName: "Karim Boudjelal",
    customerPhone: "0550123456",
    amount: 1850,
    description: "Achats épicerie semaine du 14/04",
    dueDate: daysFromNow(10),
    paid: false,
    paidAmount: 0,
    notes: "Client régulier, paye en fin de mois"
  },
  {
    customerName: "Fatima Benali",
    customerPhone: "0661234567",
    amount: 3200,
    description: "Lait, farine, huile, pâtes",
    dueDate: daysFromNow(-3),  // EN RETARD
    paid: false,
    paidAmount: 0,
    notes: "Relance nécessaire, dépasse la date"
  },
  {
    customerName: "Mehdi Zerrouki",
    customerPhone: "0770345678",
    amount: 5500,  // dépasse la limite de 5000
    description: "Grossiste - commande hebdomadaire",
    dueDate: daysFromNow(7),
    paid: false,
    paidAmount: 2000,  // paiement partiel
    notes: "A déjà versé 2000 DA, reste 3500 DA"
  },
  {
    customerName: "Amina Ouali",
    customerPhone: "0550987654",
    amount: 980,
    description: "Yaourts, fromages, boissons",
    dueDate: daysFromNow(15),
    paid: false,
    paidAmount: 0,
    notes: ""
  },
  {
    customerName: "Hocine Gherbi",
    customerPhone: "0661098765",
    amount: 2400,
    description: "Courses du mois",
    dueDate: daysFromNow(-10),  // EN RETARD
    paid: false,
    paidAmount: 500,
    notes: "Dit qu'il paiera d'ici la semaine prochaine"
  },
  {
    customerName: "Nassima Khelifi",
    customerPhone: "0770654321",
    amount: 1500,
    description: "Produits hygiène et alimentation",
    dueDate: daysFromNow(20),
    paid: false,
    paidAmount: 0,
    notes: ""
  },
  {
    customerName: "Yacine Aït Kaci",
    customerPhone: "0550112233",
    amount: 7200,  // très élevé
    description: "Commande restaurant - grossiste",
    dueDate: daysFromNow(-15),  // EN RETARD
    paid: false,
    paidAmount: 3000,
    notes: "URGENT : grosse somme en retard depuis 15 jours"
  },
  {
    customerName: "Leila Mansouri",
    customerPhone: "0661223344",
    amount: 620,
    description: "Conserves et boissons",
    dueDate: daysFromNow(5),
    paid: false,
    paidAmount: 0,
    notes: ""
  },
  {
    customerName: "Sofiane Hamdi",
    customerPhone: "0770445566",
    amount: 4300,
    description: "Achats en gros - fin de mois",
    dueDate: daysFromNow(30),
    paid: false,
    paidAmount: 1000,
    notes: "Versement initial de 1000 DA reçu"
  },
  {
    customerName: "Dalila Chabane",
    customerPhone: "0550334455",
    amount: 1100,
    description: "Farine, sucre, huile",
    dueDate: daysFromNow(-2),  // EN RETARD
    paid: false,
    paidAmount: 0,
    notes: ""
  },
  // Dettes payées (pour l'historique)
  {
    customerName: "Omar Belounis",
    customerPhone: "0661445566",
    amount: 2800,
    description: "Courses du mois de mars",
    dueDate: daysAgo(20),
    paid: true,
    paidDate: daysAgo(5),
    paidAmount: 2800,
    notes: "Soldée en une fois"
  },
  {
    customerName: "Samia Touati",
    customerPhone: "0770667788",
    amount: 950,
    description: "Produits laitiers et conserves",
    dueDate: daysAgo(15),
    paid: true,
    paidDate: daysAgo(10),
    paidAmount: 950,
    notes: ""
  },
  {
    customerName: "Rachid Ferhat",
    customerPhone: "0550778899",
    amount: 3600,
    description: "Commande événement familial",
    dueDate: daysAgo(30),
    paid: true,
    paidDate: daysAgo(8),
    paidAmount: 3600,
    notes: "Payé après plusieurs relances"
  },
  {
    customerName: "Zineb Malek",
    customerPhone: "0661889900",
    amount: 1250,
    description: "Alimentation et hygiène",
    dueDate: daysAgo(10),
    paid: true,
    paidDate: daysAgo(3),
    paidAmount: 1250,
    notes: ""
  },
  {
    customerName: "Adel Bensalem",
    customerPhone: "0770990011",
    amount: 4100,
    description: "Grossiste - commande mensuelle",
    dueDate: daysAgo(5),
    paid: true,
    paidDate: daysAgo(1),
    paidAmount: 4100,
    notes: "Bon payeur, toujours ponctuel"
  },
];

// ─────────────────────────────────────────────────────────────
//  3. SEED PRINCIPAL
// ─────────────────────────────────────────────────────────────
async function seed() {
  console.log("🔗 Connexion à MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connecté !");

  // ── Nettoyage des collections existantes ─────────────────
  console.log("\n🧹 Nettoyage des collections...");
  await Promise.all([
    Product.deleteMany({}),
    Sale.deleteMany({}),
    Debt.deleteMany({}),
  ]);
  console.log("   ✅ Collections vidées.");

  // ── Insertion des produits ────────────────────────────────
  console.log("\n📦 Insertion des produits...");
  const insertedProducts = await Product.insertMany(productsData);
  console.log(`   ✅ ${insertedProducts.length} produits insérés.`);

  // ── Génération des ventes ─────────────────────────────────
  // On crée des ventes réalistes pour les 60 derniers jours
  // en piochant aléatoirement parmi les produits insérés
  console.log("\n💰 Génération des ventes (60 ventes sur 2 mois)...");

  // On sélectionne les produits avec du stock pour les ventes
  const sellableProducts = insertedProducts.filter(p => p.quantity > 0 && !p.sold);
  
  const customers = [
    "Client direct", "Client direct", "Client direct",  // majorité sans nom
    "Karim Boudjelal", "Fatima Benali", "Amina Ouali",
    "Nassima Khelifi", "Omar Belounis", "Samia Touati",
    "Rachid Ferhat", "Dalila Chabane", "Sofiane Hamdi"
  ];
  
  const paymentMethods = ["Espèces", "Espèces", "Espèces", "Carte", "Karni"];

  const salesData = [];
  for (let i = 0; i < 60; i++) {
    // Choisir un produit aléatoire parmi les vendables
    const p = sellableProducts[Math.floor(Math.random() * sellableProducts.length)];
    
    // Quantité vendue entre 1 et 5
    const qSold = Math.floor(Math.random() * 4) + 1;
    
    // Date de vente : dans les 60 derniers jours
    const daysBackSale = Math.floor(Math.random() * 60);
    
    salesData.push({
      productId: p._id,
      productName: p.name,
      quantitySold: qSold,
      purchasePrice: p.purchasePrice,
      sellingPrice: p.sellingPrice,
      totalRevenue: p.sellingPrice * qSold,
      totalProfit: (p.sellingPrice - p.purchasePrice) * qSold,
      saleDate: daysAgo(daysBackSale),
      customerName: customers[Math.floor(Math.random() * customers.length)],
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
    });
  }
  
  const insertedSales = await Sale.insertMany(salesData);
  console.log(`   ✅ ${insertedSales.length} ventes insérées.`);

  // ── Insertion des dettes ──────────────────────────────────
  console.log("\n📋 Insertion des dettes...");
  const insertedDebts = await Debt.insertMany(debtsData);
  console.log(`   ✅ ${insertedDebts.length} dettes insérées.`);

  // ── Résumé final ──────────────────────────────────────────
  console.log("\n═══════════════════════════════════════════");
  console.log("  ✅  SEED TERMINÉ AVEC SUCCÈS !");
  console.log("═══════════════════════════════════════════");
  console.log(`  📦 Produits  : ${insertedProducts.length}`);
  console.log(`  💰 Ventes    : ${insertedSales.length}`);
  console.log(`  📋 Dettes    : ${insertedDebts.length}`);
  console.log("───────────────────────────────────────────");
  console.log("  Cas de test couverts :");
  console.log("  • Produits périmés (alertes rouges)");
  console.log("  • Produits proches péremption (alertes orange)");
  console.log("  • Produits en rupture ou stock faible");
  console.log("  • Dettes en retard");
  console.log("  • Dettes au-dessus du seuil (>5000 DA)");
  console.log("  • Historique de ventes sur 2 mois");
  console.log("═══════════════════════════════════════════\n");

  await mongoose.disconnect();
}

// ─── Lancement ───────────────────────────────────────────────
seed().catch(err => {
  console.error("❌ Erreur lors du seed :", err);
  mongoose.disconnect();
  process.exit(1);
});
