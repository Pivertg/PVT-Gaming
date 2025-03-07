require("dotenv").config(); // Charger les variables d'environnement

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
// const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// // 📌 Connexion à MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log("✅ Connecté à MongoDB"))
//   .catch(err => console.error("❌ Erreur de connexion à MongoDB :", err));
// 
// // 📌 Définition du modèle Admin
// const AdminSchema = new mongoose.Schema({
//     pseudo: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });
// const Admin = mongoose.model("Admin", AdminSchema);
// 
// // 📌 Définition du modèle Player
// const PlayerSchema = new mongoose.Schema({
//     pseudo: { type: String, required: true },
//     idBrawlStars: { type: String, required: true },
//     trophies: { type: Number, required: true },
//     image: { type: String, default: "default-avatar.png" },
//     roster: { type: String, required: true }
// });
// const Player = mongoose.model("Player", PlayerSchema);

// 📌 Initialisation du serveur
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());

const SECRET_KEY = process.env.SECRET_KEY; // Clé secrète pour JWT
const SECRET_KEY_ADMIN = process.env.SECRET_KEY_ADMIN; // Clé secrète pour création admin

// // 📌 Route pour créer un admin (DOIT ÊTRE SUPPRIMÉE APRÈS USAGE)
// app.post("/api/admin/create", async (req, res) => {
//     try {
//         const { pseudo, password, secret } = req.body;
// 
//         // Vérifier la clé secrète
//         if (secret !== SECRET_KEY_ADMIN) {
//             return res.status(403).json({ error: "Accès refusé !" });
//         }
// 
//         // Vérifier si l'admin existe déjà
//         const existingAdmin = await Admin.findOne({ pseudo });
//         if (existingAdmin) {
//             return res.status(400).json({ error: "Cet admin existe déjà !" });
//         }
// 
//         // Hasher le mot de passe
//         const hashedPassword = await bcrypt.hash(password, 10);
// 
//         // Créer l'admin
//         const newAdmin = new Admin({ pseudo, password: hashedPassword });
//         await newAdmin.save();
// 
//         res.status(201).json({ message: "✅ Admin créé avec succès !" });
//     } catch (err) {
//         res.status(500).json({ error: "❌ Erreur lors de la création de l'admin" });
//     }
// });

// 📌 Route pour se connecter en tant qu'admin
app.post("/api/admin/login", async (req, res) => {
    try {
        const { pseudo, password } = req.body;

        if (pseudo !== "admin" || password !== "mot de passe") {
            return res.status(401).json({ error: "Pseudo ou mot de passe incorrect !" });
        }

//         const admin = await Admin.findOne({ pseudo });
//         if (!admin) return res.status(401).json({ error: "Pseudo ou mot de passe incorrect !" });
// 
//         const isMatch = await bcrypt.compare(password, admin.password);
//         if (!isMatch) return res.status(401).json({ error: "Pseudo ou mot de passe incorrect !" });

        const token = jwt.sign({ pseudo: admin.pseudo }, SECRET_KEY, { expiresIn: "2h" });
        res.status(200).json({ message: "✅ Connexion réussie !", token });
    } catch (err) {
        res.status(500).json({ error: "❌ Erreur lors de l'authentification" });
    }
});

// 📌 Middleware pour sécuriser les routes admin
function verifyAdmin(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ error: "Accès refusé !" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Token invalide !" });
        req.admin = decoded;
        next();
    });
}

// 📌 Route protégée : Voir tous les joueurs
app.get("/api/admin/joueurs", verifyAdmin, async (req, res) => {
    try {
        const players = await Player.find();
        res.status(200).json(players);
    } catch (err) {
        res.status(500).json({ error: "❌ Erreur lors de la récupération des joueurs" });
    }
});

// 📌 Route pour l'inscription des joueurs
app.post("/api/inscription", async (req, res) => {
    try {
        const { pseudo, idBrawlStars, trophies, image, roster } = req.body;

        if (!pseudo || !idBrawlStars || !trophies || !roster) {
            return res.status(400).json({ error: "Tous les champs sont requis !" });
        }

        const newPlayer = new Player({ pseudo, idBrawlStars, trophies, image, roster });
        await newPlayer.save();

        res.status(201).json({ message: "✅ Inscription réussie !" });
    } catch (err) {
        res.status(500).json({ error: "❌ Erreur lors de l'inscription" });
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
server.listen(80, () => {
    console.log("🚀 Serveur en écoute sur http://localhost:80");
});
