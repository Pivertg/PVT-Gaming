document.addEventListener("DOMContentLoaded", () => {
    loadNews();
    loadMatchSchedule();
});

// 📰 Charger le fil d'actualité
function loadNews() {
    const newsList = document.getElementById("news-list");

    const news = [
        { date: "03/03/2025", content: "Nouvelle victoire en tournoi ! GG à toute l'équipe !" },
        { date: "02/03/2025", content: "Scrim contre Team XYZ programmé ce vendredi !" },
        { date: "01/03/2025", content: "Recrutement ouvert pour notre roster Beta !" }
    ];

    news.forEach(item => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item");
        newsItem.innerHTML = `<strong>${item.date}</strong> - ${item.content}`;
        newsList.appendChild(newsItem);
    });
}

// 📅 Charger les matchs/scrims programmés
function loadMatchSchedule() {
    const matchTable = document.getElementById("match-schedule");

    const matches = [
        { date: "07/03/2025", time: "20:00", opponent: "Team XYZ", event: "Scrim" },
        { date: "10/03/2025", time: "18:30", opponent: "Clan Alpha", event: "Tournoi Mensuel" },
        { date: "15/03/2025", time: "21:00", opponent: "Team Omega", event: "Demi-finale ESL" }
    ];

    matches.forEach(match => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${match.date}</td><td>${match.time}</td><td>${match.opponent}</td><td>${match.event}</td>`;
        matchTable.appendChild(row);
    });
}
