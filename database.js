const mongoose = require("mongoose");

// Connexion à la base de données MongoDB
mongoose.connect("mongodb://localhost:27017/pvtgaming", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connecté à la base de données MongoDB"))
  .catch(err => console.error("❌ Erreur de connexion à MongoDB :", err));

// Schéma pour stocker les joueurs inscrits
const PlayerSchema = new mongoose.Schema({
    pseudo: { type: String, required: true },
    idBrawlStars: { type: String, required: true },
    trophies: { type: Number, required: true },
    image: { type: String, default: "default-avatar.png" },
    roster: { type: String, required: true }
});

// Modèle MongoDB
const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;
