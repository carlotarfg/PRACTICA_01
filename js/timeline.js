const timeline = document.querySelector('.timeline');
const lineDiv = timeline.querySelector('.line');
const steps = document.querySelectorAll('.step');

// Función para actualizar animaciones
function updateTimeline() {
  const timelineRect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Mostrar pasos cuando entran en viewport
  steps.forEach(step => {
    const stepRect = step.getBoundingClientRect();
    if (stepRect.top < windowHeight * 0.8) {
      step.classList.add('show');
    }
  });

  // Calcular progreso de la línea
  const timelineTop = timelineRect.top + window.scrollY;
  const timelineBottom = timelineTop + timeline.offsetHeight;
  const scrollPosition = window.scrollY + windowHeight;

  let progress = 0;
  if (scrollPosition > timelineTop) {
    progress = (scrollPosition - timelineTop) / (timeline.offsetHeight);
    progress = Math.min(progress, 1);
  }

  lineDiv.style.width = `${progress * 100}%`;
}

// Ejecutar al cargar y al hacer scroll
window.addEventListener('scroll', updateTimeline);
window.addEventListener('load', updateTimeline);

// ------------- icono que gira

document.addEventListener("DOMContentLoaded", function () {
  const img = document.querySelector("#how_we_work img");
  let lastScrollY = window.scrollY;
  let currentRotation = -15; // Grados iniciales

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const delta = scrollY - lastScrollY;

    // Ajusta la velocidad de giro (ajusta 0.05 según necesidad)
    currentRotation += delta * 0.05;

    // Limita el rango de giro si lo deseas (opcional)
    // currentRotation = Math.max(-45, Math.min(45, currentRotation));

    img.style.transform = `translateY(-50%) rotate(${currentRotation}deg)`;

    lastScrollY = scrollY;
  });
});