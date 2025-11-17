document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".menu-mobile");
  const navbar = document.querySelector(".navbar");

  const updateNavbar = () => {
    if (mobileMenu.classList.contains("active")) {
      navbar.style.backgroundColor = "#4F5DFF";
      navbar.style.borderRadius = "13px";
      toggleBtn.textContent = "MENU –"; // abierto
    } else {
      navbar.style.backgroundColor = "";
      navbar.style.borderRadius = "";
      toggleBtn.textContent = "MENU +"; // cerrado
    }
  };

  toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    updateNavbar();
  });

  // Detectar pantallas >=1000px
  const mediaQuery = window.matchMedia("(min-width: 1000px)");
  const handleResize = (e) => {
    if (e.matches) {
      mobileMenu.classList.remove("active");
      updateNavbar();
    }
  };

  mediaQuery.addEventListener("change", handleResize);
  handleResize(mediaQuery);
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".menu-toggle-a");
  const mobileMenu = document.querySelector(".menu-mobile-a");
  const navbar = document.querySelector(".navbar-a");

  const updateNavbar = () => {
    if (mobileMenu.classList.contains("active")) {
      navbar.style.backgroundColor = "#4F5DFF";
      navbar.style.borderRadius = "13px";
      toggleBtn.textContent = "MENU –"; // abierto
    } else {
      navbar.style.backgroundColor = "";
      navbar.style.borderRadius = "";
      toggleBtn.textContent = "MENU +"; // cerrado
    }
  };

  toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    updateNavbar();
  });

  // Detectar pantallas >=1000px
  const mediaQuery = window.matchMedia("(min-width: 1000px)");
  const handleResize = (e) => {
    if (e.matches) {
      mobileMenu.classList.remove("active");
      updateNavbar();
    }
  };

  mediaQuery.addEventListener("change", handleResize);
  handleResize(mediaQuery);
});

