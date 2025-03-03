<script>
    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("inscription-form");

        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const pseudo = document.getElementById("pseudo").value.trim();
            const idBrawlStars = document.getElementById("id-brawlstars").value.trim();
            const trophies = document.getElementById("trophies").value.trim();
            const image = document.getElementById("image").value.trim() || "default-avatar.png";
            const roster = document.getElementById("roster").value;

            if (!pseudo || !idBrawlStars || !trophies || !roster) {
                alert("🚨 Veuillez remplir tous les champs !");
                return;
            }

            try {
                const response = await fetch("https://mon-api.render.com/api/inscription", {  // Remplace par ton URL d'API
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ pseudo, idBrawlStars, trophies: parseInt(trophies), image, roster })
                });

                const result = await response.json();
                if (response.ok) {
                    alert("✅ " + result.message);
                    window.location.href = "roster.html";
                } else {
                    alert("❌ " + result.error);
                }
            } catch (error) {
                alert("❌ Erreur de connexion au serveur !");
            }
        });
    });
</script>
