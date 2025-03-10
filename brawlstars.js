async function getPlayerInfo(playerTag) {
    const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImJjMjMzMjU4LTRkMWQtNDg0MC1hNzI4LTYxMGQxM2U4MDJiZSIsImlhdCI6MTc0MTYxMTI4MSwic3ViIjoiZGV2ZWxvcGVyL2NhMmI0N2FjLTFhZmItY2M4MS1lMzg5LWUzYTZlMDExMmYwNyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTk0LjI1NC42Mi41NCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.b52Dp0owyVdCgvLjxn-UVkjC6KrHBVKO4rEPAUGFlpzNLmdU4UbaZ1AbQsq3YpVCC8GE_9uDsMA6fJLbQzq5gA.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImM2OGM2ZmRhLTRkMWEtNDJkNi1hZTUyLWNlYmRjMmQxZmZiYSIsImlhdCI6MTc0MTEwODQ5NCwic3ViIjoiZGV2ZWxvcGVyL2NhMmI0N2FjLTFhZmItY2M4MS1lMzg5LWUzYTZlMDExMmYwNyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTMuNTIuMTE1LjE2NiJdLCJ0eXBlIjoiY2xpZW50In1dfQ.H36C-nnNKoJ8ejaIaVDjodu0gD7OQrYgKXqsiY2ObylhO3GhGD1iSEnOfVr4pU4WAx0WJ7i5GnujpCfaXLb6Rg'; // Remplace avec ta clé API
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
