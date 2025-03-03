async function getPlayerInfo(playerTag) {
    const apiKey = 'TA_CLE_API'; // Remplace avec ta clé API
    const url = `https://api.brawlstars.com/v1/players/%23${playerTag}`;
    
    try {
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

// Exemple d'affichage des infos d'un joueur
async function displayPlayerInfo(playerTag) {
    const data = await getPlayerInfo(playerTag);
    if (data) {
        document.getElementById('player-name').textContent = `Nom : ${data.name}`;
        document.getElementById('player-trophies').textContent = `Trophées : ${data.trophies}`;
        
        const brawlerList = document.getElementById('brawler-list');
        data.brawlers.forEach(brawler => {
            const li = document.createElement('li');
            li.textContent = `${brawler.name} : ${brawler.trophies} trophées`;
            brawlerList.appendChild(li);
        });
    }
}
