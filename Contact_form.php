<?php
$errors = [];
$errorMessage = '';
/* si formulaire envoyé alors : */
if (!empty($_POST)) {
    /* on recupere le nom, prenom, email, message et on les assignent à des variables */
   $name = $_POST['nom'];
   $prenom = $_POST['prenom'];
   $email = $_POST['email'];
   $message = $_POST['message'];
    /* si nom vide */
    if (empty($name)) {
       $errors[] = 'pas de nom';
    }
    /* si prenom vide */
    if (empty($prenom)) {
        $errors[] = 'pas de prenom';
    }
    /* si email vide ou pas en format mail (exemple@exemple.com)*/
   if (empty($email)) {
       $errors[] = 'pas de mail.';
   } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
       $errors[] = 'Mail invalide.';
   }
    /* si message pas selectionné */
    if (empty($message) || $message == "--choissisez une option--") {
        $errors[] = 'Veiullez choisir le motif de prise de contact';
    }
    /* si pas d'erreur alors  on envoie le mail avec ce code: */   
   if (empty($errors)) {
        $toEmail = 'team@nightimmersion.com'; /* destinataire */
        $emailSubject = 'Nouveau Mail de Votre Formulaire De Contact Night Immersion'; /* sujet du mail */
        $headers = ['From' => $email, 'Reply-To' => $email, 'Content-type' => 'text/html; charset=utf-8']; /* entete du mail */
        $bodyParagraphs = ["Nom: {$name}, <br>","Prenom: {$prenom}, <br>", "Email: {$email}, <br><br>", "Raison de la prise de contact: <br>", $message]; /* corps du mail */
        $body = join(PHP_EOL, $bodyParagraphs); /* corps du mail */


        if (mail($toEmail, $emailSubject, $body, $headers)) {
           header('Location: accueil.html'); /* si le mail est envoyé on redirige vers la page d'accueil */
        } else {
        $errorMessage = 'erreur, veuillez réessayer plus tard'; /* si le mail n'est pas envoyé on affiche un message d'erreur */
        }
    /* si il y'a une ou des erreurs on les affiche avec le code suivant : */
   } else {

       $allErrors = join('<br/>', $errors);
       $errorMessage = "<p style='color: red;'>{$allErrors}</p>";
   }
}

?>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form</title>
    <link rel="stylesheet" href="css/style.css">  
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700&display=swap"
    />
    <link rel="stylesheet" href="https://use.typekit.net/vvu3ndh.css">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik Mono One">
    <link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet'>  
</head>
<body>
    <header>      
        <nav id="navbar">
            <!-- logo -->
            <div class="logo">
            <a href="accueil.html">
                <img src="images/Logo_NiGHT_2_violet.png" alt="Logo" />
            </a>
            </div>
            <!-- page de contact -->
            <div class="contact">
            <a href="Contact_form.php"><button class="custom-btn btn-9">Contact</button></a>
            </div>
        </nav>
    </header>
    <main>
    <!-- formulaire de contact -->
    <form method="post" id="contact-form">
        <h2>Contact us</h2>
        <?php echo((!empty($errorMessage)) ? $errorMessage : '') ?>
        <p>
            <label>Nom:</label>
            <input name="nom" type="text" placeholder="nom..." required/>
        </p>
        <p>
            <label>Prénom:</label>
            <input name="prenom" type="text" placeholder="prénom..." required/>
        </p>
        <p>
            <label>Email Address:</label>
            <input  name="email" type="text"  placeholder="e-mail..." required/>
        </p>
        <p> 
            <label>Prise de contact pour:</label>
            <select style="cursor: pointer;" name="message" id="pet-select">
                <option value="">--choissisez une option--</option>
                <option value="curieux">curieux</option>
                <option value="interessé">interessé</option>
                <option value="entreprise">nous sommes une entreprise</option>
            </select>
        </p>
        <p>
            <input type="submit" value="Send"/>
        </p>
    </form>
    <div class="imagefond">
          <div class="bubbles">  
          </div>
        </div>
    </main>
    <footer>
        <div class="footerContainer">
            <!-- logo du pied de page -->
            <div class="socialIcons">
              <a href="https://www.instagram.com/nightimmersion"><i class="fa-brands fa-instagram"></i></a>
              <a href="https://twitter.com/NiGHTiMMERSiON"><i class="fa-brands fa-twitter"></i></a>
              <a href="https://www.linkedin.com/in/night-immersion-740b48286/"><i class="fa-brands fa-linkedin"></i></a>
              <a href="https://www.tiktok.com/@nightimmersion"><i class="fa-brands fa-tiktok"></i></a>
            </div>
            <!-- Navigation du pied de page -->
            <div class="footerNav">
              <ul>
                <li><a href="accueil.html">Accueil</a></li>  
                <li><a href="accueil.html#card">Qui-sommes-nous ?</a></li>
                <li><a href="accueil.html#nouveaute">Nouveauté</a></li>
                <li><a href="accueil.html#casque">À propos</a></li>
                <li><a href="Contact_form.php">Nous contacter</a></li>
              </ul>
            </div>
            <!-- droit d'auteur -->
            <div class="footerBottom">
              <p>Copyrigth &copy;2023</p>
            </div>
          </div>
        </footer>
        <!-- script js suivant : -->
        <script>
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
      navbar.style.backgroundColor = "grey";
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
            });
        </script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/validate.js/0.13.1/validate.min.js"></script>
    </body>
</html>

