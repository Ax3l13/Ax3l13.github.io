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
  <button id="skip-button" style="display: none; position: fixed; bottom: 20px; right: 20px; padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
  Passer
</button>
  
  <script>
    const questions = [
  { question: "Quel est le rôle principal d'un scan de vulnérabilités ?", answers: ["Identifier les logiciels installés", "Détecter les vulnérabilités connues", "Supprimer les malwares", "Mettre à jour le système"], correct: 1, multiple: false },
  { question: "Quel outil est utilisé pour scanner les vulnérabilités ?", answers: ["Nessus", "Adobe Reader", "Photoshop", "VLC"], correct: 0, multiple: false },
  { question: "Pourquoi désactiver les mises à jour automatiques dans ce contexte ?", answers: ["Pour économiser la bande passante", "Pour maintenir le système vulnérable", "Pour éviter les bugs", "Pour protéger les données"], correct: 1, multiple: false },
  { question: "Quelle étape suit l'analyse des résultats d'un scan de vulnérabilités ?", answers: ["Installation d'un antivirus", "Sélection d'une vulnérabilité critique", "Configuration du pare-feu", "Mise à jour du système"], correct: 1, multiple: false },
  { question: "Quel est un exemple de système d'exploitation vulnérable ?", answers: ["Windows XP", "Ubuntu 22.04", "Windows 11", "macOS Ventura"], correct: 0, multiple: false },
  { question: "Que permet un exploit ?", answers: ["Corriger une vulnérabilité", "Exploiter une vulnérabilité", "Bloquer les cyberattaques", "Améliorer les performances système"], correct: 1, multiple: false },
  { question: "Quel site est utilisé pour rechercher des exploits ?", answers: ["Exploit Database", "Google Docs", "Wikipedia", "Stack Overflow"], correct: 0, multiple: false },
  { question: "Quelle mesure est essentielle après avoir corrigé une vulnérabilité ?", answers: ["Réinstaller l'OS", "Reconfigurer le BIOS", "Réexécuter un scan de vulnérabilités", "Fermer la machine virtuelle"], correct: 2, multiple: false },
  { question: "Quelle est la première étape d'une analyse de vulnérabilités ?", answers: ["Créer un rapport", "Scanner la machine", "Installer un système vulnérable", "Appliquer les correctifs"], correct: 2, multiple: false },
  { question: "Quel outil est utilisé pour configurer un pare-feu ?", answers: ["Nessus", "Wireshark", "Windows Defender Firewall", "OpenVAS"], correct: 2, multiple: false },
  { question: "Quel type de vulnérabilité critique doit être priorisé ?", answers: ["Faible", "Modérée", "Critique", "Insignifiante"], correct: 2, multiple: false },
  { question: "Quelle est la finalité d'un rapport d'analyse de vulnérabilités ?", answers: ["Mettre à jour le système", "Fournir des recommandations de sécurité", "Réinitialiser la machine virtuelle", "Tester les correctifs"], correct: 1, multiple: false },
  { question: "Quelle est une conséquence possible d'une exploitation de vulnérabilité ?", answers: ["Augmentation de la vitesse système", "Accès non autorisé aux données", "Suppression automatique de l'exploit", "Amélioration des performances réseau"], correct: 1, multiple: false },
  { question: "Pourquoi utiliser un antivirus sur une machine virtuelle vulnérable ?", answers: ["Pour supprimer les fichiers inutiles", "Pour protéger contre les exploits", "Pour empêcher l'installation d'applications", "Pour améliorer la vitesse de démarrage"], correct: 1, multiple: false },
  { question: "Quel est l'objectif principal de l'exploitation d'une vulnérabilité dans ce scénario ?", answers: ["Accéder au système cible", "Améliorer la sécurité", "Économiser de l'énergie", "Installer des logiciels"], correct: 0, multiple: false },
  { question: "Que signifie le terme 'exploit' ?", answers: ["Un logiciel de protection", "Un programme utilisé pour exploiter une vulnérabilité", "Une méthode pour réparer une faille", "Un scanner réseau"], correct: 1, multiple: false },
  { question: "Quelle est une méthode efficace pour prévenir les vulnérabilités ?", answers: ["Désactiver les correctifs", "Installer les mises à jour de sécurité", "Supprimer les logiciels antivirus", "Ignorer les alertes de sécurité"], correct: 1, multiple: false },
  { question: "Quelle action suit la sélection d'une vulnérabilité critique ?", answers: ["Corriger la faille immédiatement", "Rechercher un exploit", "Éteindre la machine virtuelle", "Reconfigurer le pare-feu"], correct: 1, multiple: false },
  { question: "Quel est un exemple d'outil pour identifier les vulnérabilités ?", answers: ["Nmap", "Nessus", "VMware", "Firefox"], correct: 1, multiple: false },
  { question: "Que faire après avoir corrigé une vulnérabilité ?", answers: ["Ignorer la vulnérabilité", "Scanner à nouveau le système", "Supprimer l'antivirus", "Redémarrer sans tester"], correct: 1, multiple: false },
  { question: "Que représente le score CVSS dans une analyse de vulnérabilités ?", answers: ["La gravité d'une vulnérabilité", "La vitesse de l'attaque", "Le nombre d'exploits disponibles", "La taille de la machine virtuelle"], correct: 0, multiple: false },
  { question: "Pourquoi utiliser VirtualBox pour ce type de projet ?", answers: ["Pour accéder à Internet", "Pour créer un environnement isolé", "Pour désactiver les mises à jour", "Pour améliorer la vitesse réseau"], correct: 1, multiple: false },
  { question: "Comment sécuriser efficacement une machine virtuelle ?", answers: ["Appliquer des correctifs de sécurité", "Ignorer les alertes de sécurité", "Désactiver le pare-feu", "Désinstaller les logiciels"], correct: 0, multiple: false },
  { question: "Que peut détecter un scanner de vulnérabilités ?", answers: ["Des problèmes matériels", "Des failles de sécurité connues", "Des erreurs d'interface utilisateur", "Des fichiers temporaires inutiles"], correct: 1, multiple: false },
  { question: "Pourquoi est-il important d'identifier les failles critiques ?", answers: ["Pour ignorer les vulnérabilités mineures", "Pour prioriser les correctifs", "Pour supprimer les logiciels antivirus", "Pour économiser les ressources système"], correct: 1, multiple: false },
  { question: "Quel est un exemple de mesure préventive efficace ?", answers: ["Installer un logiciel antivirus", "Désactiver les pare-feux", "Ignorer les mises à jour", "Supprimer les alertes de sécurité"], correct: 0, multiple: false },
  { question: "Quel est le rôle principal d'un rapport d'analyse ?", answers: ["Améliorer l'interface utilisateur", "Documenter les vulnérabilités et recommandations", "Créer des failles de sécurité", "Mettre à jour automatiquement le système"], correct: 1, multiple: false },
  { question: "Quelle action est nécessaire après une exploitation réussie ?", answers: ["Configurer un pare-feu", "Désactiver les correctifs", "Supprimer la machine virtuelle", "Désinstaller l'antivirus"], correct: 0, multiple: false },
  { question: "Quel est l'objectif principal d'un test de vulnérabilité ?", answers: ["Évaluer la sécurité du système", "Améliorer la vitesse du réseau", "Créer des vulnérabilités", "Tester des fonctionnalités inutiles"], correct: 0, multiple: false },
  { question: "Pourquoi utiliser Nessus dans ce projet ?", answers: ["Pour désactiver les alertes de sécurité", "Pour scanner et identifier les vulnérabilités", "Pour configurer des pare-feux", "Pour installer des correctifs automatiquement"], correct: 1, multiple: false },
  { question: "Que signifie 'mise en situation' dans ce contexte ?", answers: ["Simuler un scénario réel", "Installer un logiciel antivirus", "Rechercher des exploits", "Supprimer des failles de sécurité"], correct: 0, multiple: false },
  { question: "Quel est un résultat possible d'une exploitation ?", answers: ["Amélioration des performances système", "Accès non autorisé à des données", "Augmentation de la mémoire RAM", "Supprimer les vulnérabilités"], correct: 1, multiple: false },
  { question: "Pourquoi appliquer des correctifs de sécurité ?", answers: ["Pour ignorer les failles", "Pour empêcher les attaques futures", "Pour améliorer l'interface utilisateur", "Pour désactiver les alertes"], correct: 1, multiple: false },
  { question: "Quel outil peut être utilisé pour tester les protections appliquées ?", answers: ["Nessus", "PowerPoint", "Word", "Excel"], correct: 0, multiple: false },
  { question: "Pourquoi est-il utile d'utiliser une machine virtuelle pour ce projet ?", answers: ["Pour simuler des scénarios réels dans un environnement sécurisé", "Pour tester les performances du système", "Pour supprimer les logiciels inutiles", "Pour améliorer les graphismes"], correct: 0, multiple: false },
  { question: "Quel est un avantage des rapports d'analyse de vulnérabilités ?", answers: ["Documenter les failles et solutions", "Désactiver les mises à jour", "Améliorer l'esthétique du système", "Créer des vulnérabilités"], correct: 0, multiple: false },
  { question: "Quel est l'objectif principal d'une analyse des vulnérabilités ?", answers: ["Améliorer l'ergonomie", "Identifier et corriger les failles", "Augmenter la vitesse réseau", "Désactiver les correctifs"], correct: 1, multiple: false },
  { question: "Que permet un scanner de vulnérabilités comme Nessus ?", answers: ["Créer des exploits", "Identifier des vulnérabilités connues", "Améliorer les graphismes", "Supprimer les fichiers temporaires"], correct: 1, multiple: false }
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

      questionData.answers.forEach((answer, index) => {
        const choiceEl = document.createElement('li');
        const buttonEl = document.createElement('button');
        buttonEl.textContent = answer;
        buttonEl.onclick = () => selectAnswer(index, buttonEl, questionData.multiple, questionData.correct.length);
        choiceEl.appendChild(buttonEl);
        choicesEl.appendChild(choiceEl);
      });
      
      function startTimer()
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

    function startTimer()  {
    const timerEl = document.getElementById('timer');
    const skipButton = document.getElementById('skip-button');
    skipButton.style.display = 'none'; // Masque le bouton au début

    timerEl.style.width = '100%';
    timerEl.style.transition = 'none';

    setTimeout(() => {
        timerEl.style.transition = 'width 20s linear'; // Durée totale 20 secondes
        timerEl.style.width = '0%';
    }, 50);

    // Afficher le bouton après 10 secondes
    setTimeout(() => {
        skipButton.style.display = 'block';
    }, 10000); // Temps pour afficher le bouton (10 secondes)

    // Déclenche la fin de la question après 20 secondes
    timerInterval = setTimeout(() => {
        handleAnswer();
    }, 20000);

    // Gérer le clic sur le bouton "Passer"
    skipButton.onclick = () => {
        clearInterval(timerInterval); // Annule le timer si le bouton est cliqué
        skipButton.style.display = 'none'; // Cache le bouton
        handleAnswer(); // Passe à la question suivante
    };

    showQuestion();
  </script>
</body>
</html>
