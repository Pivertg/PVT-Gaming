document.addEventListener("DOMContentLoaded", function () {
    const newsList = document.getElementById("news-list");

    const news = [
        { date: "03/03/2025", content: "🏆 Nouvelle victoire en tournoi ! Félicitations à l'équipe !" },
        { date: "02/03/2025", content: "📢 Scrim contre Team XYZ prévu ce vendredi !" },
        { date: "01/03/2025", content: "🎯 Le recrutement pour le roster Beta est ouvert !" }
    ];

    newsList.innerHTML = "";
    news.forEach(item => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item");
        newsItem.innerHTML = `<strong>${item.date}</strong> - ${item.content}`;
        newsList.appendChild(newsItem);
    });
});
