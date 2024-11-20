<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QCM Interactif</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      height: 100vh;
      padding-top: 50px;
    }
    .container {
      background-color: white;
      padding: 40px 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 1200px;
      text-align: center;
      position: relative;
      margin-bottom: 20px;
    }
    .question-number {
      font-size: 24px;
      margin-bottom: 10px;
      text-align: center;
      border-bottom: 2px solid #007bff;
      padding-bottom: 10px;
    }
    .question {
      font-size: 20px;
      margin-bottom: 20px;
      text-align: center;
    }
    .choices {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      position: relative;
      margin-top: 50px;
      width: 80%;
    }
    .choices li {
      width: 35%;
      margin: 10px 0;
    }
    .choices li:nth-child(odd) {
      margin-right: 10%;
    }
    .choices li button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 20px;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
      text-align: center;
      font-size: 16px;
    }
    .choices li button.selected {
      background-color: #0056b3;
    }
    .choices li button.correct {
      background-color: green;
    }
    .choices li button.incorrect {
      background-color: red;
    }
    .timer {
      background-color: #007bff;
      height: 10px;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .response-info {
      text-align: right;
      margin-top: 10px;
      font-size: 14px;
    }
    /* Style pour masquer le titre h1 avec le lien */
    h1 a[href="https://ax3l13.github.io/"] {
      display: none;
    }
  </style>
</head>
<body>
  <div class="container" id="qcm-container">
    <div id="question-number" class="question-number">Question numéro 1</div>
    <div id="question-container" class="question-container">
      <!-- La question apparaîtra ici -->
    </div>
    <div id="response-info" class="response-info">Une seule réponse possible</div>
    <div class="timer" id="timer"></div>
  </div>
  <ul class="choices" id="choices">
    <!-- Les choix de réponse apparaîtront ici -->
  </ul>
  
  <script>
    const questions = [
      // Niveau facile (vert)
      { question: "Quelle étape est cruciale pour maintenir une machine virtuelle vulnérable ?", answers: ["Activer les mises à jour automatiques", "Désactiver les mises à jour automatiques", "Changer le mot de passe administrateur", "Configurer un pare-feu"], correct: 1, multiple: false, level: 'facile' },
      { question: "Quel outil n'est pas utilisé pour le scan de vulnérabilités ?", answers: ["Nessus", "OpenVAS", "Wireshark", "Nexpose"], correct: 2, multiple: false, level: 'facile' },
      { question: "Pourquoi désactiver les mises à jour automatiques ?", answers: ["Pour économiser de la bande passante", "Pour maintenir la machine vulnérable", "Pour améliorer les performances", "Pour éviter les redémarrages"], correct: 1, multiple: false, level: 'facile' },
      { question: "Quelle est la première étape pour analyser les vulnérabilités ?", answers: ["Télécharger un exploit", "Exécuter un scan de vulnérabilités", "Configurer un pare-feu", "Installer un antivirus"], correct: 1, multiple: false, level: 'facile' },
      { question: "Quels résultats sont attendus après un scan de vulnérabilités ?", answers: ["Liste des mises à jour disponibles", "Liste des vulnérabilités connues", "Rapport de performance", "Analyse du trafic réseau"], correct: 1, multiple: false, level: 'facile' },
      { question: "Quel outil est utilisé pour identifier les vulnérabilités ?", answers: ["VirtualBox", "Nessus", "Wireshark", "Metasploit"], correct: 1, multiple: false, level: 'facile' },
      { question: "Que faire après avoir identifié une vulnérabilité critique ?", answers: ["Redémarrer la machine", "Télécharger un exploit spécifique", "Désinstaller le système", "Modifier les paramètres réseau"], correct: 1, multiple: false, level: 'facile' },
      { question: "Quel est le but d'un exploit ?", answers: ["Corriger une vulnérabilité", "Accéder à des données sensibles", "Améliorer la performance du système", "Gérer les utilisateurs"], correct: 1, multiple: false, level: 'facile' },
      
      // Niveau moyen (orange)
      { question: "Quels outils sont utilisés pour l'analyse des vulnérabilités ?", answers: ["Nessus, OpenVAS, Nexpose", "Wireshark, TCPDump, Netcat", "Metasploit, Armitage, Cobalt Strike", "VirtualBox, VMware, Hyper-V"], correct: 0, multiple: true, level: 'moyen' },
      { question: "Pourquoi exécuter un scan de vulnérabilités ?", answers: ["Pour identifier les vulnérabilités connues", "Pour améliorer les performances système", "Pour optimiser la consommation énergétique", "Pour surveiller le trafic réseau"], correct: 0, multiple: false, level: 'moyen' },
      { question: "Quelle mesure de protection peut atténuer l'exploitation d'une vulnérabilité ?", answers: ["Changer le fond d'écran", "Appliquer les correctifs de sécurité", "Augmenter la résolution d'écran", "Modifier le thème du système"], correct: 1, multiple: false, level: 'moyen' },
      { question: "Quel est le rôle d'un pare-feu dans la protection des systèmes ?", answers: ["Bloquer les mises à jour", "Filtrer le trafic réseau", "Améliorer les performances graphiques", "Gérer les utilisateurs"], correct: 1, multiple: false, level: 'moyen' },
      { question: "Comment vérifier l'efficacité des mesures de protection ?", answers: ["Redémarrer la machine", "Réexécuter le scan de vulnérabilités", "Modifier les paramètres réseau", "Installer un nouveau système"], correct: 1, multiple: false, level: 'moyen' },
      { question: "Quelle étape précède l'exécution d'un exploit ?", answers: ["Télécharger le correctif de sécurité", "Configurer un pare-feu", "Analyser les résultats du scan", "Désactiver les mises à jour automatiques"], correct: 2, multiple: false, level: 'moyen' },
      { question: "Quels sont les objectifs principaux d'une analyse de vulnérabilités ?", answers: ["Identifier, exploiter, protéger", "Installer, configurer, redémarrer", "Désactiver, mettre à jour, sauvegarder", "Analyser, optimiser, supprimer"], correct: 0, multiple: false, level: 'moyen' },
      { question: "Quels résultats sont obtenus après l'exploitation d'une vulnérabilité ?", answers: ["Amélioration des performances", "Accès obtenu, données compromises", "Liste des utilisateurs", "Rapport de sauvegarde"], correct: 1, multiple: false, level: 'moyen' },
      
      // Niveau intermédiaire (bleu)
      { question: "Quelle étape n'est pas nécessaire pour la création d'une machine virtuelle vulnérable ?", answers: ["Utiliser un ISO d'installation approprié", "Configurer un pare-feu", "Désactiver les mises à jour automatiques", "Installer un système d'exploitation vulnérable"], correct: 1, multiple: false, level: 'intermédiaire' },
            { question: "Quelle est l'importance de désactiver les mises à jour automatiques ?", answers: ["Maintenir la machine vulnérable", "Optimiser les performances", "Améliorer la sécurité", "Gérer les utilisateurs"], correct: 0, multiple: false, level: 'intermédiaire' },
      { question: "Comment identifier les vulnérabilités critiques ?", answers: ["En configurant un pare-feu", "En analysant les résultats du scan", "En redémarrant la machine", "En changeant le mot de passe administrateur"], correct: 1, multiple: false, level: 'intermédiaire' },
      { question: "Quel est le rôle d'un exploit dans une analyse de vulnérabilités ?", answers: ["Corriger une vulnérabilité", "Exploiter une vulnérabilité", "Bloquer les attaques", "Surveiller le trafic réseau"], correct: 1, multiple: false, level: 'intermédiaire' },
      { question: "Pourquoi est-il important d'appliquer des mesures de protection après l'exploitation ?", answers: ["Pour améliorer les performances", "Pour empêcher ou atténuer l'exploitation future", "Pour configurer le réseau", "Pour installer des mises à jour"], correct: 1, multiple: false, level: 'intermédiaire' },
      { question: "Quels sont les objectifs principaux des mesures de protection ?", answers: ["Identifier, exploiter, protéger", "Surveiller, analyser, optimiser", "Empêcher, atténuer, corriger", "Configurer, redémarrer, sauvegarder"], correct: 2, multiple: false, level: 'intermédiaire' },
      { question: "Quelle est la dernière étape de l'analyse des vulnérabilités ?", answers: ["Rédiger un rapport détaillé", "Installer un antivirus", "Redémarrer la machine virtuelle", "Modifier les paramètres de sécurité"], correct: 0, multiple: false, level: 'intermédiaire' },
      
      // Niveau difficile (rouge)
      { question: "Quel type de vulnérabilité est le plus critique dans une machine virtuelle non mise à jour ?", answers: ["Vulnérabilités de sécurité", "Vulnérabilités de performance", "Vulnérabilités réseau", "Vulnérabilités matérielles"], correct: 0, multiple: false, level: 'difficile' },
      { question: "Quel est l'impact potentiel de l'exploitation d'une vulnérabilité critique ?", answers: ["Accès non autorisé", "Amélioration des performances", "Optimisation du réseau", "Génération de rapports"], correct: 0, multiple: false, level: 'difficile' },
      { question: "Quelle est la première mesure de protection recommandée après l'exploitation d'une vulnérabilité ?", answers: ["Appliquer les correctifs de sécurité", "Changer le mot de passe administrateur", "Configurer un pare-feu", "Installer un antivirus"], correct: 0, multiple: false, level: 'difficile' },
      { question: "Quels sont les avantages de l'analyse des vulnérabilités ?", answers: ["Identification des points faibles", "Amélioration des performances système", "Optimisation de la consommation énergétique", "Surveillance du trafic réseau"], correct: 0, multiple: false, level: 'difficile' },
      { question: "Quels outils peuvent être utilisés pour exploiter les vulnérabilités ?", answers: ["Metasploit, Armitage", "Wireshark, TCPDump", "Nessus, OpenVAS", "VirtualBox, VMware"], correct: 0, multiple: false, level: 'difficile' },
      { question: "Quelle étape est nécessaire avant de rédiger le rapport d'analyse ?", answers: ["Vérifier les paramètres de sécurité", "Réexécuter le scan de vulnérabilités", "Documenter les exploits utilisés", "Analyser les résultats de l'exploitation"], correct: 3, multiple: false, level: 'difficile' },
      { question: "Quelle technique est souvent utilisée pour exploiter une vulnérabilité réseau ?", answers: ["Sniffing", "Spoofing", "Injection SQL", "Déni de service"], correct: 0, multiple: false, level: 'difficile' },
      { question: "Quelle est une bonne pratique pour sécuriser une machine après exploitation ?", answers: ["Appliquer les correctifs de sécurité", "Désactiver les mises à jour", "Redémarrer la machine", "Modifier l'interface utilisateur"], correct: 0, multiple: false, level: 'difficile' },
      { question: "Quel est le principal objectif de l'analyse des vulnérabilités ?", answers: ["Identifier et corriger les points faibles de sécurité", "Optimiser les performances du système", "Gérer les utilisateurs", "Surveiller le trafic réseau"], correct: 0, multiple: false, level: 'difficile' }
    ];
    
    let currentQuestionIndex = 0;
    let timerInterval;
    let selectedAnswers = [];

    function showQuestion() {
      if (currentQuestionIndex >= questions.length) {
        alert("QCM terminé !");
        return;
      }
      
      selectedAnswers = [];
      const questionContainer = document.getElementById('question-container');
      const questionNumberEl = document.getElementById('question-number');
      const responseInfoEl = document.getElementById('response-info');
      const choicesEl = document.getElementById('choices');
      questionContainer.innerHTML = '';
      choicesEl.innerHTML = '';
      
      const questionData = questions[currentQuestionIndex];
      
      questionNumberEl.textContent = `Question numéro ${currentQuestionIndex + 1}`;
      responseInfoEl.textContent = questionData.multiple ? `Plusieurs réponses possibles (${questionData.correct.length} attendues)` : 'Une seule réponse possible';
      
      const questionEl = document.createElement('div');
      questionEl.classList.add('question');
      questionEl.textContent = questionData.question;
      questionContainer.appendChild(questionEl);

      // Colorer la barre selon le niveau de difficulté
      const levelColors = {
        facile: 'green',
        moyen: 'orange',
        intermédiaire: 'blue',
        difficile: 'red'
      };
      document.querySelector('.question-number').style.borderBottomColor = levelColors[questionData.level];

      questionData.answers.forEach((answer, index) => {
        const choiceEl = document.createElement('li');
        const buttonEl = document.createElement('button');
        buttonEl.textContent = answer;
        buttonEl.onclick = () => selectAnswer(index, buttonEl, questionData.multiple, questionData.correct.length);
        choiceEl.appendChild(buttonEl);
        choicesEl.appendChild(choiceEl);
      });
      
      startTimer();
    }

    function selectAnswer(index, buttonEl, multiple, correctLength) {
      if (multiple) {
        if (selectedAnswers.includes(index)) {
          selectedAnswers = selectedAnswers.filter(i => i !== index);
          buttonEl.classList.remove('selected');
        } else if (selectedAnswers.length < correctLength) {
          selectedAnswers.push(index);
          buttonEl.classList.add('selected');
        } else {
          const firstSelected = selectedAnswers.shift();
          const firstSelectedButton = document.querySelectorAll('.choices button')[firstSelected];
          firstSelectedButton.classList.remove('selected');
          selectedAnswers.push(index);
          buttonEl.classList.add('selected');
        }
      } else {
        selectedAnswers = [index];
        const choices = document.querySelectorAll('.choices button');
        choices.forEach(button => button.classList.remove('selected'));
        buttonEl.classList.add('selected');
      }
    }

    function handleAnswer() {
      clearInterval(timerInterval);
      const questionData = questions[currentQuestionIndex];
      const selectedButtons = document.querySelectorAll('.choices button.selected');
      
      if (questionData.multiple) {
        selectedButtons.forEach(button => {
          const selectedAnswer = Array.from(button.parentNode.parentNode.children).indexOf(button.parentNode);
          if (questionData.correct.includes(selectedAnswer)) {
            button.classList.add('correct');
          } else {
            button.classList.add('incorrect');
          }
        });
        questionData.correct.forEach(correctIndex => {
          const correctButton = document.querySelector(`.choices li:nth-child(${correctIndex + 1}) button`);
          correctButton.classList.add('correct');
        });
      } else {
        const selectedAnswer = Array.from(selectedButtons[0].parentNode.parentNode.children).indexOf(selectedButtons[0].parentNode);
        if (selectedAnswer === questionData.correct) {
          selectedButtons[0].classList.add('correct');
        } else {
          selectedButtons[0].classList.add('incorrect');
          const correctButton = document.querySelector(`.choices li:nth-child(${questionData.correct + 1}) button`);
          correctButton.classList.add('correct');
        }
      }

      setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
      }, 2000);
    }

    function startTimer() {
      const timerEl = document.getElementById('timer');
      timerEl.style.width = '100%';
      timerEl.style.transition = 'none';
      setTimeout(() => {
        timerEl.style.transition = 'width 20s linear';
        timerEl.style.width = '0%';
      }, 50);
      timerInterval = setTimeout(() => {
        handleAnswer();
      }, 20000);
    }

    showQuestion();
  </script>
</body>
</html>
