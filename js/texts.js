document.addEventListener("DOMContentLoaded", function () {
  const options = { threshold: 0.1 };

  const fadeLine = (entry) => {
    const span = entry.target;
    if (entry.isIntersecting) {
      // Al entrar en vista → negro
      span.style.opacity = 1;
      span.style.transform = "translateY(0)";
    }
    // No hacer nada al salir de vista (se queda negro)
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(fadeLine);
  }, options);

  // Separar párrafos por <br> y aplicar efecto
  document.querySelectorAll(".text1 p, .text2 p, .text3 p").forEach((p) => {
    const text = p.innerHTML; // Capturar <br>
    const lines = text.split(/<br\s*\/?>|<br>/gi); // Separar por <br>

    // Crear contenedor para las nuevas líneas
    const container = document.createElement("div");
    container.style.display = "block";

    lines.forEach((line, i) => {
      if (line.trim() === "") return; // Saltar líneas vacías

      const lineSpan = document.createElement("span");
      lineSpan.style.display = "block";
      lineSpan.style.opacity = 0.2; // Empieza gris
      lineSpan.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      lineSpan.style.transform = "translateY(20px)";
      lineSpan.style.transitionDelay = `${i * 0.15}s`;
      lineSpan.innerHTML = line.trim(); // Mantener posibles etiquetas

      container.appendChild(lineSpan);
      observer.observe(lineSpan);
    });

    // Reemplazar el contenido del párrafo
    p.innerHTML = "";
    p.appendChild(container);
  });
});