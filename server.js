const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { verifyPassword } = require("./auth");

// Connexion à MongoDB
mongoose.connect("mongodb://localhost:27017/pvtgaming", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connecté à MongoDB"))
  .catch(err => console.error("❌ Erreur de connexion à MongoDB :", err));

// Définition du modèle pour les joueurs
const PlayerSchema = new mongoose.Schema({
    pseudo: { type: String, required: true },
    idBrawlStars: { type: String, required: true },
    trophies: { type: Number, required: true },
    image: { type: String, default: "default-avatar.png" },
    roster: { type: String, required: true }
});

const Player = mongoose.model("Player", PlayerSchema);

// Initialisation du serveur Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public")); // Servir les fichiers statiques
app.use(bodyParser.json());
app.use(cors());

// 📌 Route pour l'inscription des joueurs
app.post("/api/inscription", async (req, res) => {
    try {
        const { pseudo, idBrawlStars, trophies, image, roster } = req.body;

        if (!pseudo || !idBrawlStars || !trophies || !roster) {
            return res.status(400).json({ error: "Tous les champs sont requis !" });
        }

        const newPlayer = new Player({ pseudo, idBrawlStars, trophies, image, roster });
        await newPlayer.save();

        res.status(201).json({ message: "Inscription réussie !" });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de l'inscription" });
    }
});

// 📌 Route pour vérifier le mot de passe
app.post("/verify-password", async (req, res) => {
    const { pseudo, password } = req.body;
    const isValid = await verifyPassword(password);

    if (isValid) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// 📌 Gestion du chat en temps réel
io.on("connection", (socket) => {
    console.log("🔵 Un utilisateur est connecté");

    socket.on("message", (msg) => {
        io.emit("message", msg);
    });

    socket.on("disconnect", () => {
        console.log("🔴 Un utilisateur s'est déconnecté");
    });
});

// 📌 Démarrage du serveur
server.listen(3000, () => {
    console.log("🚀 Serveur en écoute sur http://localhost:3000");
});
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
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const SECRET_KEY = "supersecret"; // Clé secrète pour sécuriser les tokens

// Route pour se connecter en tant qu'administrateur
app.post("/api/admin/login", async (req, res) => {
    try {
        const { pseudo, password } = req.body;

        const admin = await Admin.findOne({ pseudo });
        if (!admin) return res.status(401).json({ error: "Pseudo ou mot de passe incorrect !" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ error: "Pseudo ou mot de passe incorrect !" });

        const token = jwt.sign({ pseudo: admin.pseudo }, SECRET_KEY, { expiresIn: "2h" });
        res.status(200).json({ message: "Connexion réussie !", token });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de l'authentification" });
    }
});

// Middleware pour sécuriser les routes admin
function verifyAdmin(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ error: "Accès refusé !" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Token invalide !" });
        req.admin = decoded;
        next();
    });
}

// Route protégée (Exemple : Voir tous les joueurs)
app.get("/api/admin/joueurs", verifyAdmin, async (req, res) => {
    try {
        const players = await Player.find();
        res.status(200).json(players);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des joueurs" });
    }
});

// Démarrage du serveur
app.listen(3000, () => {
    console.log("🚀 Serveur démarré sur http://localhost:3000");
});
