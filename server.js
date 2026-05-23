const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/smartinventory")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

// Import Routes
const productRoutes = require("./routes/productRoutes");
const debtRoutes = require("./routes/debtRoutes");
const salesRoutes = require("./routes/salesRoutes");

// Use Routes
app.use("/api/products", productRoutes);
app.use("/api/debts", debtRoutes);
app.use("/api/sales", salesRoutes);

// Root Route
app.get("/", (req, res) => {
  res.json({ 
    message: "🚀 Smart Inventory API is running",
    endpoints: {
      products: "/api/products",
      debts: "/api/debts",
      sales: "/api/sales"
    }
  });
});

// Cron Job - Vérification quotidienne des produits proches d'expiration
cron.schedule("0 9 * * *", async () => {
  console.log("🔍 Running daily expiration check...");
  try {
    const Product = require("./models/Product");
    const today = new Date();
    const warningDate = new Date();
    warningDate.setDate(today.getDate() + 7); // 7 jours avant expiration

    const expiringProducts = await Product.find({
      expirationDate: { $lte: warningDate, $gte: today },
      sold: false
    });

    if (expiringProducts.length > 0) {
      console.log(`⚠️ ${expiringProducts.length} produit(s) proche(s) d'expiration:`);
      expiringProducts.forEach(p => {
        console.log(`   - ${p.name} (expire le ${p.expirationDate.toLocaleDateString()})`);
      });
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});

// Cron Job - Vérification des dettes dépassant la limite
cron.schedule("0 18 * * *", async () => {
  console.log("💰 Running daily debt check...");
  try {
    const Debt = require("./models/Debt");
    const debtLimit = 5000; // Limite en DZD
    
    const highDebts = await Debt.find({
      amount: { $gte: debtLimit },
      paid: false
    }).populate("customerName");

    if (highDebts.length > 0) {
      console.log(`🚨 ${highDebts.length} dette(s) dépassant la limite:`);
      highDebts.forEach(d => {
        console.log(`   - ${d.customerName}: ${d.amount} DZD`);
      });
    }
  } catch (error) {
    console.error("Error in debt cron job:", error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🌟 Server running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});
