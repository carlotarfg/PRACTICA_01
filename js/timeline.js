// const timeline = document.querySelector('.timeline');
// const line = document.querySelector('.timeline::before'); // No podemos seleccionar ::before directamente
// const steps = document.querySelectorAll('.step');

// // Para controlar la línea usamos un pseudo-elemento, así que mejor creamos un div dentro de .timeline
// const lineDiv = document.createElement('div');
// lineDiv.classList.add('line');
// timeline.prepend(lineDiv);

// window.addEventListener('scroll', () => {
//   const timelineRect = timeline.getBoundingClientRect();
//   const windowHeight = window.innerHeight;

//   // Aparecen los steps cuando están visibles
//   steps.forEach(step => {
//     const stepRect = step.getBoundingClientRect();
//     if (stepRect.top < windowHeight * 0.8) { 
//       step.classList.add('show');
//     }
//   });

//   // Animar la línea de izquierda a derecha
//   let totalWidth = timeline.offsetWidth;
//   let scrollProgress = Math.min(Math.max((window.innerHeight - timelineRect.top) / (windowHeight + timeline.offsetHeight), 0), 1);
//   lineDiv.style.width = `${scrollProgress * 100}%`;
// });



// const timeline = document.querySelector('.timeline');
// const lineDiv = timeline.querySelector('.line'); // Ya existe en el HTML
// const steps = document.querySelectorAll('.step');

// // Animación al hacer scroll
// window.addEventListener('scroll', () => {
//   const timelineRect = timeline.getBoundingClientRect();
//   const windowHeight = window.innerHeight;

//   // Mostrar pasos cuando entran en viewport
//   steps.forEach(step => {
//     const stepRect = step.getBoundingClientRect();
//     if (stepRect.top < windowHeight * 0.8) {
//       step.classList.add('show');
//     }
//   });

//   // Animar la línea: crece desde izquierda a derecha según el scroll
//   const scrollProgress = Math.max(0, Math.min(
//     (window.scrollY - (timelineRect.top + window.pageYOffset - windowHeight)) / 
//     (timeline.offsetHeight),
//     1
//   ));
  
//   lineDiv.style.width = `${scrollProgress * 100}%`;
// });

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