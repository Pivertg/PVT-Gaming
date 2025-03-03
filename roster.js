document.addEventListener("DOMContentLoaded", function () {
    const rosterSelect = document.getElementById("roster-select");
    const rosterDetails = document.getElementById("roster-details");

    // Charger les joueurs inscrits depuis le stockage local
    const savedRosters = JSON.parse(localStorage.getItem("rosters")) || {};

    function displayRoster(rosterKey) {
        if (!savedRosters[rosterKey] || savedRosters[rosterKey].length === 0) {
            rosterDetails.innerHTML = "<p>Aucun joueur inscrit dans ce roster.</p>";
            return;
        }

        let tableHTML = `
            <h2>${rosterKey.replace("roster", "Roster ")}</h2>
            <table class="roster-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Pseudo</th>
                        <th>ID Brawl Stars</th>
                        <th>Trophées</th>
                    </tr>
                </thead>
                <tbody>`;

        savedRosters[rosterKey].forEach(player => {
            tableHTML += `
                <tr>
                    <td><img src="${player.image}" alt="Avatar" class="player-img"></td>
                    <td>${player.pseudo}</td>
                    <td>${player.id}</td>
                    <td>${player.trophies}</td>
                </tr>`;
        });

        tableHTML += `</tbody></table>`;
        rosterDetails.innerHTML = tableHTML;
    }

    rosterSelect.addEventListener("change", function () {
        displayRoster(this.value);
    });
});
