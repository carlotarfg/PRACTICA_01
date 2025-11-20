const timeline = document.querySelector('.timeline');
const line = document.querySelector('.timeline::before'); // No podemos seleccionar ::before directamente
const steps = document.querySelectorAll('.step');

// Para controlar la línea usamos un pseudo-elemento, así que mejor creamos un div dentro de .timeline
const lineDiv = document.createElement('div');
lineDiv.classList.add('line');
timeline.prepend(lineDiv);

window.addEventListener('scroll', () => {
  const timelineRect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Aparecen los steps cuando están visibles
  steps.forEach(step => {
    const stepRect = step.getBoundingClientRect();
    if (stepRect.top < windowHeight * 0.8) { 
      step.classList.add('show');
    }
  });

  // Animar la línea de izquierda a derecha
  let totalWidth = timeline.offsetWidth;
  let scrollProgress = Math.min(Math.max((window.innerHeight - timelineRect.top) / (windowHeight + timeline.offsetHeight), 0), 1);
  lineDiv.style.width = `${scrollProgress * 100}%`;
});

