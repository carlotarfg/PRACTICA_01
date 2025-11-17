document.addEventListener("DOMContentLoaded", () => {

  // --- Función para inicializar un menú ---
  function initNavbar(navbarSelector, toggleSelector, menuSelector) {
    const navbar = document.querySelector(navbarSelector);
    const toggleBtn = document.querySelector(toggleSelector);
    const mobileMenu = document.querySelector(menuSelector);

    if (!navbar || !toggleBtn || !mobileMenu) return; 
    const updateNavbar = () => {
      const isActive = mobileMenu.classList.contains("active");
      navbar.style.backgroundColor = isActive ? "#4F5DFF" : "";
      navbar.style.borderRadius = isActive ? "13px" : "";

      const icon = toggleBtn.querySelector(".toggle-icon");
      if (icon) icon.textContent = isActive ? "−" : "+";

      mobileMenu.style.maxHeight = isActive ? mobileMenu.scrollHeight + "px" : "0px";
      toggleBtn.setAttribute("aria-expanded", isActive ? "true" : "false");
    };

    toggleBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      updateNavbar();
    });

    const mediaQuery = window.matchMedia("(min-width: 1000px)");
    const handleResize = (e) => {
      if (e.matches) {
        mobileMenu.classList.remove("active");
        updateNavbar();
      }
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleResize);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(handleResize);
    }

    mobileMenu.style.overflow = "hidden";
    mobileMenu.style.transition = "max-height 0.36s ease-in-out";
    mobileMenu.style.maxHeight = mobileMenu.classList.contains("active") ? mobileMenu.scrollHeight + "px" : "0px";
    updateNavbar();
  }

  initNavbar(".navbar", ".menu-toggle", ".menu-mobile");
  initNavbar(".navbar-a", ".menu-toggle-a", ".menu-mobile-a");



});
