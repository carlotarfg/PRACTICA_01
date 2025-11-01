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

// ----------- 
document.addEventListener("DOMContentLoaded", () => {

  const headings = document.querySelectorAll(".marquework h1");

  // imagenes
  const img1 = document.querySelector('#work .col-lg-8 img');
  const img2 = document.querySelector('#work .col-lg-4 img');
  const img3 = document.querySelector('#work .col-12 img');

  // contenedores
  const cont1 = document.querySelector('#work .col-lg-8');
  const cont2 = document.querySelector('#work .col-lg-4');
  const contBottom = document.querySelector('#work .col-12');

  // guardamos las alturas reales por filas
  const row1Height = Math.max(cont1.offsetHeight, cont2.offsetHeight);
  const row2Height = contBottom.offsetHeight;

  // fijamos las alturas originales
  cont1.style.height = row1Height + "px";
  cont2.style.height = row1Height + "px";
  contBottom.style.height = row2Height + "px";

  // forzar fit igualado
  [img1, img2, img3].forEach(img => {
    img.style.height = "100%";
    img.style.objectFit = "cover";
  });

  const defaultImages = {
    img1: img1.src,
    img2: img2.src,
    img3: img3.src
  };

  // define qué imágenes entran según el texto
  const imagesByCategory = {
    "UX / UI": {
      img1: "media/img/ux_2.png",
      img2: "media/img/ux_3.png",
      img3: "media/img/ux_1.png"
    },
    "3D": {
      img1: "media/img/Rectangle 5.png",
      img2: "media/img/Rectangle 5.png",
      img3: "media/img/Rectangle 5.png"
    },
    "EDITORIAL": {
      img1: "media/img/Rectangle 4.png",
      img2: "media/img/Rectangle 4.png",
      img3: "media/img/Rectangle 4.png"
    },
    "MOTION GRAPHICS": {
      img1: "media/img/Rectangle 6.png",
      img2: "media/img/Rectangle 6.png",
      img3: "media/img/Rectangle 6.png"
    }
  };

  headings.forEach(h => {
    h.addEventListener("mouseenter", () => {
      const cat = h.textContent.trim();
      if (imagesByCategory[cat]) {
        img1.src = imagesByCategory[cat].img1;
        img2.src = imagesByCategory[cat].img2;
        img3.src = imagesByCategory[cat].img3;
      }
    });

    h.addEventListener("mouseleave", () => {
      img1.src = defaultImages.img1;
      img2.src = defaultImages.img2;
      img3.src = defaultImages.img3;
    });
  });

});

// --------------- 



const opinions = document.querySelectorAll('#opinions .opinion1, #opinions .opinion2, #opinions .opinion3, #opinions .opinion4, #opinions .opinion5');

opinions.forEach(opinion => {
  const originalTransform = getComputedStyle(opinion).transform;

  opinion.addEventListener('mouseenter', () => {
    // Hacer la tarjeta recta, más grande y por encima
    opinion.style.transform = 'rotate(0deg) translateY(-10px) scale(1.05)'; // recta y un poco más grande
    opinion.style.zIndex = '999';
    opinion.style.transition = 'transform 0.3s ease, z-index 0.3s ease, box-shadow 0.3s ease';
    opinion.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';

    // Apartar las demás tarjetas
    opinions.forEach(other => {
      if(other !== opinion) {
        other.style.transition = 'transform 0.3s ease';
        other.style.transform += ' translateY(10px)'; // se mueven ligeramente hacia abajo
      }
    });
  });

  opinion.addEventListener('mouseleave', () => {
    // Volvemos a la tarjeta a su estado original
    opinion.style.transform = originalTransform;
    opinion.style.zIndex = '';
    opinion.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';

    // Restauramos las demás tarjetas
    opinions.forEach(other => {
      if(other !== opinion) {
        other.style.transform = getComputedStyle(other).transform.replace(' translateY(10px)','');
      }
    });
  });
});
