document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".menu-mobile");
  const navbar = document.querySelector(".navbar");

  const updateNavbar = () => {
    if (mobileMenu.classList.contains("active")) {
      navbar.style.backgroundColor = "#4F5DFF";
      navbar.style.borderRadius = "13px";
    } else {
      navbar.style.backgroundColor = "";
      navbar.style.borderRadius = "";
    }
  };

  toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    updateNavbar();
  });

  // Detectar cambios de tamaño
  const mediaQuery = window.matchMedia("(min-width: 1000px)");
  const handleResize = (e) => {
    if (e.matches) {
      // Pantalla >= 1000px: ocultar menú móvil y quitar estilos
      mobileMenu.classList.remove("active");
      updateNavbar();
    }
  };

  // Escuchar cambios de media query
  mediaQuery.addEventListener("change", handleResize);

  // Llamada inicial por si la página ya carga en escritorio
  handleResize(mediaQuery);
});
