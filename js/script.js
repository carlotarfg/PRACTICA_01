





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


// ---------------- COUNT-UP----------------

const statNumbers = document.querySelectorAll('.stat-number');
const optionsNumbers = { threshold: 0.5 };

const animateNumber = (el) => {
  const suffixEl = el.querySelector('span');
  const suffix = suffixEl ? suffixEl.textContent : '';
  const target = parseInt(el.dataset.target); 
  let current = 0;
  const duration = 1500;
  const stepTime = Math.max(Math.floor(duration / target), 20);

  const timer = setInterval(() => {
    current++;
    if (current >= target) {
      current = target; 
      clearInterval(timer);
    }
    el.textContent = current + suffix;
  }, stepTime);
};

const observerNumbers = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      animateNumber(entry.target);
      obs.unobserve(entry.target); 
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
    let scrollFactor = 1 - rect.top / (windowHeight + rect.height);

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

// ----------- PROJECTS HOVER -------------

document.addEventListener("DOMContentLoaded", () => {

  const headings = document.querySelectorAll(".marquework h1");

  const img1 = document.querySelector('#work .col-lg-8 img');
  const img2 = document.querySelector('#work .col-lg-4 img');
  const img3 = document.querySelector('#work .col-12 img');

  const cont1 = document.querySelector('#work .col-lg-8');
  const cont2 = document.querySelector('#work .col-lg-4');
  const contBottom = document.querySelector('#work .col-12');

  const row1Height = Math.max(cont1.offsetHeight, cont2.offsetHeight);
  const row2Height = contBottom.offsetHeight;

  cont1.style.height = row1Height + "px";
  cont2.style.height = row1Height + "px";
  contBottom.style.height = row2Height + "px";

  [img1, img2, img3].forEach(img => {
    img.style.height = "100%";
    img.style.objectFit = "cover";
  });

  const defaultImages = {
    img1: img1.src,
    img2: img2.src,
    img3: img3.src
  };

  const imagesByCategory = {
    "UX / UI": {
      img1: "media/img/RADIANT 2.webp",
      img2: "media/img/tasty.webp",
      img3: "media/img/DIZZER.webp"
    },
    "3D": {
      img1: "media/img/PROSE4.webp",
      img2: "media/img/PLASTIC FLOWER6.webp",
      img3: "media/img/skin.webp"
    },
    "EDITORIAL": {
      img1: "media/img/Uffizi5.webp",
      img2: "media/img/Uffizi9.webp",
      img3: "media/img/clap.webp"
    },
    "BRANDING": {
      img1: "media/img/bigbun3.webp",
      img2: "media/img/pufy14.webp",
      img3: "media/img/5.webp"
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
      h.style.color = "black";
    });

    h.addEventListener("mouseleave", () => {
      img1.src = defaultImages.img1;
      img2.src = defaultImages.img2;
      img3.src = defaultImages.img3;
      h.style.color = "";
    });
  });

});


// --------------- REVIEWS ---------------

const opinions = document.querySelectorAll('#opinions .opinion1, #opinions .opinion2, #opinions .opinion3, #opinions .opinion4, #opinions .opinion5');

opinions.forEach(opinion => {
  const originalTransform = getComputedStyle(opinion).transform;

  opinion.addEventListener('mouseenter', () => {
    opinion.style.transform = 'rotate(0deg) translateY(-10px) scale(1.05)';
    opinion.style.zIndex = '999';
    opinion.style.transition = 'transform 0.3s ease, z-index 0.3s ease, box-shadow 0.3s ease';
    opinion.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';

    opinions.forEach(other => {
      if(other !== opinion) {
        other.style.transition = 'transform 0.3s ease';
        other.style.transform += ' translateY(10px)'; 
      }
    });
  });

  opinion.addEventListener('mouseleave', () => {
    opinion.style.transform = originalTransform;
    opinion.style.zIndex = '';
    opinion.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';

    opinions.forEach(other => {
      if(other !== opinion) {
        other.style.transform = getComputedStyle(other).transform.replace(' translateY(10px)','');
      }
    });
  });
});

// ---------------- LINEA ----------

document.addEventListener("DOMContentLoaded", () => {
  const lines = document.querySelectorAll(".vertical1, .vertical2, .vertical3");

  lines.forEach(line => {
    const fullHeight = parseFloat(getComputedStyle(line).height);
    line.dataset.fullHeight = fullHeight; 
    line.style.height = "0px";
    line.style.transition = "height 0.45s ease"; 
  });

  function drawLines() {
    const windowBottom = window.innerHeight;

    lines.forEach(line => {
      const rect = line.getBoundingClientRect();
      const fullHeight = parseFloat(line.dataset.fullHeight);

      if (rect.top < windowBottom && rect.bottom > 0) {
        let visibleRatio = ((windowBottom - rect.top) / (windowBottom + rect.height)) * 1.2;
        visibleRatio = Math.min(Math.max(visibleRatio, 0), 1);
        line.style.height = fullHeight * visibleRatio + "px";
      }
    });
  }

  window.addEventListener("scroll", drawLines);
  drawLines(); 
});



// ----------- POP UP ---------- 

document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('cookie-banner');
  const acceptAllBtn = document.getElementById('accept-all');
  const manageBtn = document.getElementById('manage-cookies');
  const closeBtn = document.getElementById('close-cookie');

  if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => {
      banner.classList.add('show');
    }, 300);
  }

  const acceptAndHide = () => {
    banner.classList.remove('show');
    setTimeout(() => {
      banner.style.display = 'none';
    }, 400);
    localStorage.setItem('cookiesAccepted', 'true');
  };

  acceptAllBtn?.addEventListener('click', acceptAndHide);

  manageBtn?.addEventListener('click', () => {
    alert('Redirecting to cookie settings...');
    acceptAndHide(); 
  });

  closeBtn?.addEventListener('click', () => {
    banner.classList.remove('show');
    setTimeout(() => {
      banner.style.display = 'none';
    }, 400);
    
  });
});

// -------------- ICONO 

document.addEventListener("DOMContentLoaded", function () {
    const icon = document.querySelector(".icon-header");

    const icon1 = "media/svgs/Recurso 21.svg";     
    const icon2 = "media/svgs/Recurso 31.svg";    

    const cambiarIconoYBorde = () => {
        icon.src = icon2;
        icon.classList.add("icon-header--con-borde");
    };

    const volverIconoOriginal = () => {
        icon.src = icon1;
        icon.classList.remove("icon-header--con-borde");
    };

    icon.addEventListener("mouseenter", cambiarIconoYBorde);

    icon.addEventListener("mouseleave", volverIconoOriginal);

    icon.addEventListener("click", () => {
        cambiarIconoYBorde();
        setTimeout(volverIconoOriginal, 1000); 
    });

    let isScrolling = false;

    window.addEventListener("scroll", () => {
        if (!isScrolling) {
            cambiarIconoYBorde();
            isScrolling = true;

            setTimeout(() => {
                volverIconoOriginal();
                isScrolling = false;
            }, 150);
        }
    });
});