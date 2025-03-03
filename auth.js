const crypto = require('crypto');
const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
    code: String,
    generatedAt: { type: Date, default: Date.now },
    validUntil: Date,
});

const Code = mongoose.model('Code', CodeSchema);

// Génération d'un code de connexion unique chaque semaine
function generateWeeklyCode() {
    const currentDate = new Date();
    const weekNumber = Math.ceil(currentDate.getDate() / 7);
    const randomString = crypto.randomBytes(3).toString('hex'); 
    return `WEEK${weekNumber}-${randomString}`;
}

// Générer et enregistrer le code dans la base de données
async function generateAndSaveCode() {
    const code = generateWeeklyCode();
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 7); // Valide 7 jours

    const newCode = new Code({ code, validUntil });
    await newCode.save();

    console.log(`Code généré : ${code}`);
}

// Vérifier si un mot de passe correspond au code en base de données
async function verifyPassword(inputCode) {
    const codeEntry = await Code.findOne({ code: inputCode });
    return codeEntry ? true : false;
}

module.exports = { generateAndSaveCode, verifyPassword };
