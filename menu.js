document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    if (!menuIcon || !dropdownMenu) {
        console.error("Erreur : Éléments du menu non trouvés.");
        return;
    }

    menuIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        dropdownMenu.classList.toggle("show-menu");
    });

    document.addEventListener("click", function (event) {
        if (!menuIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove("show-menu");
        }
    });
});
