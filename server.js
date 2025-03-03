const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Schéma Admin
const AdminSchema = new mongoose.Schema({
    pseudo: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const Admin = mongoose.model("Admin", AdminSchema);

// Création d'un compte admin par défaut (exécuté une seule fois)
async function createAdmin() {
    const existingAdmin = await Admin.findOne({ pseudo: "admin" });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash("monmotdepasse123", 10);
        await new Admin({ pseudo: "admin", password: hashedPassword }).save();
        console.log("✅ Compte admin créé !");
    } else {
        console.log("🔹 L'admin existe déjà.");
    }
}

// Exécuter la fonction au démarrage
createAdmin();
