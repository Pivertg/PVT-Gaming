document.addEventListener("DOMContentLoaded", function () {
    const openLogin = document.getElementById("open-login");
    const closeLogin = document.getElementById("close-login");
    const loginModal = document.getElementById("login-container");

    if (openLogin && loginModal) {
        openLogin.addEventListener("click", function (event) {
            event.preventDefault();
            loginModal.classList.remove("hidden");
        });

        closeLogin.addEventListener("click", function () {
            loginModal.classList.add("hidden");
        });
    }
});
