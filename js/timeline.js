// Animación de scroll con IntersectionObserver
document.addEventListener("DOMContentLoaded", () => {
  const timeline = document.getElementById('timeline');
  const line = document.getElementById('timeline-line');
  const items = Array.from(timeline.querySelectorAll('.timeline-item'));

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        // línea se dibuja
        line.classList.add('visible');

        // items aparecen secuencialmente
        items.forEach((item, i) => {
          setTimeout(() => item.classList.add('visible'), i * 250);
        });

        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  observer.observe(timeline);
});
