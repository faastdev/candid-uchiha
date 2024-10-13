document.addEventListener('DOMContentLoaded', (event) => {
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

  function createBubbles() {
    setInterval(createBubble, 2000); // Créer une nouvelle bulle toutes les 2 secondes
  }

  createBubbles();

    const cards = document.querySelectorAll('.card');
    const cards2 = document.querySelectorAll('.card2');

    function addCardAnimation(card) {
      card.addEventListener('mousemove', function (event) {
          const cardRect = card.getBoundingClientRect();
          const mouseX = event.clientX - cardRect.left;
          const mouseY = event.clientY - cardRect.top;
  
          // Centrer les valeurs autour de zéro et réduire l'amplitude de rotation
          const centerX = cardRect.width / 2;
          const centerY = cardRect.height / 2;
          const rotateX = -((mouseY - centerY) / centerY) * 15; // Réduit l'angle de rotation max
          const rotateY = ((mouseX - centerX) / centerX) * 15; // Réduit l'angle de rotation max
  
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
  
      card.addEventListener('mouseout', function () {
          card.style.transition = 'transform 0.5s ease-out'; // Ajoute une transition lisse
          card.style.transform = 'none';
      });
  
      card.addEventListener('mouseenter', function () {
          card.style.transition = 'none'; // Enlève la transition lors du mouvement de la souris pour éviter des retards
      });
  }
  

  // Apply the animation to all '.card' elements
  cards.forEach(addCardAnimation);
  // Apply the animation to all '.card2' elements
  cards2.forEach(addCardAnimation);

  AOS.init({
    delay: 0,         // Valeur du délai avant que l'animation ne commence.
    anchorPlacement: 'top-bottom',  // Commence les animations quand le haut de l'élément atteint le bas du viewport.
    startEvent: 'load'  // Utilise l'événement 'load' pour démarrer les animations AOS.
  });

});

var videos = document.querySelectorAll('.video');
var audio = document.getElementById('myaudio');
audio.volume = 0.19; // Réglez le volume à 50%
document.getElementById('playButton').addEventListener('click', function() {
  var audio = document.getElementById('myaudio');
  audio.play();
  this.style.display = 'none';
});

videos.forEach(function(video) {
  video.addEventListener('play', function() {
      // Mettre en pause la musique de fond
      audio.volume= 0.04;
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
      audio.volume = 0.19;
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

var video2 = document.getElementById('videoPlayer');
var fadeOutDelay = 2000; // Délai en millisecondes avant que la vidéo ne commence à disparaître
var text2 = document.querySelector('.apparition2');
video2.volume = 0.1; // Réglez le volume à 10%

var observer2 = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
      if (entry.isIntersecting) { // Lorsque la vidéo est visible dans le viewport
          video2.play(); // Commencez à jouer la vidéo
          setTimeout(function() {
              video2.style.opacity = '0'; // Commencez le fondu de la vidéo
              setTimeout(function() {
                  video2.style.display = 'none'; // Cachez complètement la vidéo après le fondu
                  text2.style.display = 'block';
                  text2.style.opacity = '1'; // Faites apparaître le texte
              }, 1000); // Le délai correspond à la durée de la transition CSS
          }, fadeOutDelay);
      }
  });
}, { threshold: 0.7 });

observer2.observe(video2);

video2.addEventListener('timeupdate', function() {
  if (this.duration - this.currentTime < 1) { // Déclenchez 1 seconde avant la fin
      this.style.opacity = '0'; // Commencez le fondu de la vidéo
      setTimeout(() => {
          text2.style.display = 'block';
          text2.style.opacity = '1'; // Montrez le texte
      }, 1000); // Après que l'opacité commence à changer
  }
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