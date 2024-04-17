document.addEventListener('DOMContentLoaded', (event) => {
  var players = [];
  var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 800,
      modifier: 1,
      slideShadows: false
    },
    keyboard: {
      enabled: true
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    breakpoints: {
      640: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 1
      },
      1024: {
        slidesPerView: 2 
      },
      1560: {
        slidesPerView: 2
      }
    },
  });
  var navbar = document.getElementById('navbar');

  var prevScrollPos = window.pageYOffset || document.documentElement.scrollTop;
  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
    if (prevScrollPos > currentScrollPos) {
      navbar.style.opacity = 0;
      navbar.style.top = "-60px";
    } else {
      navbar.style.opacity = 0.7;
      navbar.style.top = "0";
    }
    prevScrollPos = currentScrollPos;
  };

  const maxBubbles = 10; 
  const activeBubbles = [];

  function createBubble() {
    if (activeBubbles.length < maxBubbles) {
      const bubble = document.createElement("div");
      bubble.className = "bubble";
      bubble.style.width = `${Math.floor(Math.random() * 80) + 20}px`;
      bubble.style.height = bubble.style.width;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animationDuration = `${Math.floor(Math.random() * 5) + 5}s`; // Durée de l'animation entre 5 et 10 secondes
      bubble.style.animationDelay = `${Math.random() * 5}s`; // Délai de départ entre 0 et 5 secondes

      document.querySelector(".bubbles").appendChild(bubble);
      activeBubbles.push(bubble);

      bubble.addEventListener("animationend", () => {
        bubble.remove();
        activeBubbles.splice(activeBubbles.indexOf(bubble), 1);
      });
    }
  }
  
  var videos = document.querySelectorAll('.video');
  var audio = document.getElementById('myaudio');
  audio.volume = 0.05; // Réglez le volume à 50%
  document.getElementById('playButton').addEventListener('click', function() {
    var audio = document.getElementById('myaudio');
    audio.play();
});

document.getElementById('playButton').addEventListener('click', function() {
  this.style.display = 'none';
});

  videos.forEach(function(video) {
    video.addEventListener('play', function() {
        // Mettre en pause la musique de fond
        audio.pause();
    });

    // Optionnel: Reprise de la musique de fond lorsque toutes les vidéos sont en pause
    video.addEventListener('pause', resumeMusic);
    video.addEventListener('ended', resumeMusic);
});

function resumeMusic() {
    // Vérifie si tous les vidéos sont en pause
    let allPaused = true;
    videos.forEach(function(video) {
        if (!video.paused) {
            allPaused = false;
        }
    });
    if (allPaused) {
        audio.play();
    }
}

var video = document.getElementById('myVideo');
var contentAfterVideo = document.getElementById('apparition');
video.volume = 0.1; // Réglez le volume à

  var options = {
    root: null, // par défaut, l'élément racine est la fenêtre de visualisation
    rootMargin: '-160px',
    threshold: 1  // 50% de l'élément doit être visible
  };

  var observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play();
      }
    });
  }, options);

  observer.observe(video);

  video.onended = function() {
    // Commence le fondu de la vidéo
    video.style.transition = "opacity 1s";
    video.style.opacity = 0;

    // Assurez-vous que la vidéo disparaisse complètement après le fondu
    setTimeout(function() {
      video.style.display = 'none';

      // Après que la vidéo a disparu, montrez le contenu suivant
      contentAfterVideo.style.display = 'block';
      setTimeout(function() {
        contentAfterVideo.style.opacity = 1;
      }, 10); // Un petit délai pour que le display change prenne effet
    }, 1000); // Correspond à la durée de la transition de 2 secondes
  };

  function createBubbles() {
    setInterval(createBubble, 2000); // Créer une nouvelle bulle toutes les 2 secondes
  }

  createBubbles();

  const cards = document.querySelectorAll('.card');

  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (event) {
      const cardRect = card.getBoundingClientRect();
      const mouseX = event.clientX - cardRect.left;
      const mouseY = event.clientY - cardRect.top;

      const rotateX = (mouseY / cardRect.height - 0.5) * 30;
      const rotateY = (mouseX / cardRect.width - 0.5) * 30;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(150px)`;
    });

    card.addEventListener('mouseout', function () {
      card.style.transform = 'none';
    });
});

});

gsap.registerPlugin(ScrollTrigger);

function changeText(selector, newText) {
  const element = document.getElementById(selector);
  gsap.to(element, {
    opacity: 0,
    duration: 0.1, // Un court fondu pour le changement de texte
    onComplete: () => {
      element.textContent = newText;
      gsap.to(element, { opacity: 1, duration: 0.1 });
    }
  });
}

function ajusterLargeur(selector, nouvelleLargeur) {
  gsap.to(selector, {
    width: nouvelleLargeur, // Définissez ici la nouvelle largeur souhaitée
    duration: 0, // Durée de l'animation pour changer la largeur
    ease: "power1.inOut", // Facultatif : Type d'animation pour une transition plus douce
  });
}

// Votre animation existante
gsap.to("#Menma", {
  y: 680, // Ajustez cette valeur selon les besoins
  x: -300,
  autoAlpha: 1,
  scale: 1,
  scrollTrigger: {
    trigger: "#Menma",
    start: "top 140",
    end: "+=280",
    scrub: true,
    onEnter: () => (changeText("Menma", "Katsu Uchiha"), ajusterLargeur("#Menma", "100%")),
    onLeave: () => (changeText("Menma", "Caractère Katsu Uchiha"), ajusterLargeur("#Menma", "150%")), 
    onEnterBack: () => changeText("Menma", "Caractère Katsu Uchiha"),
    onLeaveBack: () => (changeText("Menma", "Katsu Uchiha"), ajusterLargeur("#Menma", "100%")),
  }
});

