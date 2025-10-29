// ---------------- FADE ----------------

const optionsText1 = { threshold: 0.1 };

const fadeLine = (entry) => {
  const p = entry.target;
  if (entry.isIntersecting) {
    p.style.opacity = 1;
  } else {
    p.style.opacity = 0.2;
  }
};

const observerText1 = new IntersectionObserver((entries) => {
  entries.forEach(fadeLine);
}, optionsText1);

document.querySelectorAll(".text p, .text1 p").forEach((line, i) => {
  line.style.transitionDelay = `${i * 0.15}s`;
  observerText1.observe(line);
});

// ---------------- FADE----------------

let lastScroll2 = 0;
const optionsText2 = { threshold: 0.1 };

function revealLine2(entry) {
  const p = entry.target;
  const currentScroll = window.scrollY;
  const scrollingDown = currentScroll > lastScroll2;
  lastScroll2 = currentScroll;

  if (entry.isIntersecting && scrollingDown) {
    p.style.opacity = 1;
  }
}

const observerText2 = new IntersectionObserver(entries => {
  entries.forEach(revealLine2);
}, optionsText2);

document.querySelectorAll(".text_about_us p").forEach((line, i) => {
  line.style.transitionDelay = `${i * 0.15}s`;
  observerText2.observe(line);
});

// ---------------- COUNT-UP----------------

const statNumbers = document.querySelectorAll('.stat-number');
const optionsNumbers = { threshold: 0.5 };

const animateNumber = (el) => {
  const suffixEl = el.querySelector('span');
  const suffix = suffixEl ? suffixEl.textContent : '';
  const target = parseInt(el.dataset.target); // número final
  let current = 0;
  const duration = 1500;
  const stepTime = Math.max(Math.floor(duration / target), 20);

  const timer = setInterval(() => {
    current++;
    if (current >= target) {
      current = target; // se asegura que llegue al número exacto
      clearInterval(timer);
    }
    el.textContent = current + suffix;
  }, stepTime);
};

const observerNumbers = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      animateNumber(entry.target);
      obs.unobserve(entry.target); // solo se ejecuta una vez
    }
  });
}, optionsNumbers);

statNumbers.forEach(el => observerNumbers.observe(el));


statNumbers.forEach(el => observerNumbers.observe(el));

// ---------------- VIDEO -------------- 
const video = document.querySelector('.video_lola .video-header');
const container = document.querySelector('.video_lola');

function animateVideo() {
  const rect = container.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if(rect.bottom > 0 && rect.top < windowHeight){
    // Factor proporcional al scroll dentro del contenedor
    let scrollFactor = 1 - rect.top / (windowHeight + rect.height);

    // Escala más rápida: de 1 → 1.5 en lugar de 1 → 1.35
    const scale = 1 + 0.5 * scrollFactor;

    video.style.transform = `scale(${scale})`;
  } else if(rect.top >= windowHeight){
    video.style.transform = 'scale(1)';
  } else if(rect.bottom <= 0){
    video.style.transform = 'scale(1.5)';
  }
}

window.addEventListener('scroll', animateVideo);
animateVideo();

