document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.querySelector(".menu-icon");
    const navMenu = document.querySelector("nav");

    menuIcon.addEventListener("click", function() {
        navMenu.classList.toggle("show");
    });

    // Fermer le menu quand on clique ailleurs
    document.addEventListener("click", function(event) {
        if (!menuIcon.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove("show");
        }
    });
});
