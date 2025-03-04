document.addEventListener("DOMContentLoaded", function () {
    const newsList = document.getElementById("news-list");

    // Mode "À venir..." tant que l'accès admin n'est pas dispo
    const news = [
        { date: "🚧", content: "🔜 À venir..." }
    ];

    newsList.innerHTML = "";
    news.forEach(item => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item");
        newsItem.innerHTML = `<strong>${item.date}</strong> - ${item.content}`;
        newsList.appendChild(newsItem);
    });
});
