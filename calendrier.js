document.addEventListener("DOMContentLoaded", () => {
    loadMatchSchedule();
});

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
