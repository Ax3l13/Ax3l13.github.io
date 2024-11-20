<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QCM Interactif</title>
  <style>
    /* Styles de base comme précédemment */
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; height: 100vh; padding-top: 50px; }
    .container { background-color: white; padding: 40px 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); width: 100%; max-width: 1200px; text-align: center; position: relative; margin-bottom: 20px; }
    .question-number { font-size: 24px; margin-bottom: 10px; text-align: center; padding-bottom: 10px; }
    .question { font-size: 20px; margin-bottom: 20px; text-align: center; }
    .choices { list-style: none; padding: 0; display: flex; justify-content: space-around; flex-wrap: wrap; position: relative; margin-top: 50px; width: 80%; }
    .choices li { width: 35%; margin: 10px 0; }
    .choices li button { background-color: #007bff; color: white; border: none; padding: 20px; border-radius: 4px; cursor: pointer; width: 100%; text-align: center; font-size: 16px; }
    .choices li button.selected { background-color: #0056b3; }
    .choices li button.correct { background-color: green; }
    .choices li button.incorrect { background-color: red; }
    .timer { background-color: #007bff; height: 10px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; width: 100%; position: absolute; bottom: 0; left: 0; }
    .response-info { text-align: right; margin-top: 10px; font-size: 14px; }
    /* Styles pour les couleurs des niveaux */
    .easy { border-bottom: 2px solid green; }
    .medium { border-bottom: 2px solid orange; }
    .intermediate { border-bottom: 2px solid blue; }
    .hard { border-bottom: 2px solid red; }
  </style>
</head>
<body>
  <div class="container" id="qcm-container">
    <div id="question-number" class="question-number">Question numéro 1</div>
    <div id="question-container" class="question-container"></div>
    <div id="response-info" class="response-info">Une seule réponse possible</div>
    <div class="timer" id="timer"></div>
  </div>
  <ul class="choices" id="choices"></ul>
  <button id="skip-button">Passer</button>
  
  <script>
    const questions = [
      // Niveau facile (1 point)
      { level: 'easy', question: "Quel est le rôle principal d'un scan de vulnérabilités ?", answers: ["Identifier les logiciels installés", "Détecter les vulnérabilités connues", "Supprimer les malwares", "Mettre à jour le système"], correct: 1, multiple: false },
      { level: 'easy', question: "Quel outil est utilisé pour scanner les vulnérabilités ?", answers: ["Nessus", "Adobe Reader", "Photoshop", "VLC"], correct: 0, multiple: false },

      // Niveau moyen (2 points)
      { level: 'medium', question: "Pourquoi désactiver les mises à jour automatiques dans ce contexte ?", answers: ["Pour économiser la bande passante", "Pour maintenir le système vulnérable", "Pour éviter les bugs", "Pour protéger les données"], correct: 1, multiple: false },
      { level: 'medium', question: "Quelle étape suit l'analyse des résultats d'un scan de vulnérabilités ?", answers: ["Installation d'un antivirus", "Sélection d'une vulnérabilité critique", "Configuration du pare-feu", "Mise à jour du système"], correct: 1, multiple: false },

      // Niveau intermédiaire (3 points)
      { level: 'intermediate', question: "Quel site est utilisé pour rechercher des exploits ?", answers: ["Exploit Database", "Google Docs", "Wikipedia", "Stack Overflow"], correct: 0, multiple: false },
      { level: 'intermediate', question: "Quelle mesure est essentielle après avoir corrigé une vulnérabilité ?", answers: ["Réinstaller l'OS", "Reconfigurer le BIOS", "Réexécuter un scan de vulnérabilités", "Fermer la machine virtuelle"], correct: 2, multiple: false },

      // Niveau difficile (4 points)
      { level: 'hard', question: "Que signifie le terme 'exploit' ?", answers: ["Un logiciel de protection", "Un programme utilisé pour exploiter une vulnérabilité", "Une méthode pour réparer une faille", "Un scanner réseau"], correct: 1, multiple: false },
      { level: 'hard', question: "Pourquoi appliquer des correctifs de sécurité ?", answers: ["Pour ignorer les failles", "Pour empêcher les attaques futures", "Pour améliorer l'interface utilisateur", "Pour désactiver les alertes"], correct: 1, multiple: false },

      // Ajoutez d'autres questions ici selon les niveaux de difficulté...
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
      responseInfoEl.textContent = questionData.multiple ? `Plusieurs réponses possibles` : 'Une seule réponse possible';

      const questionEl = document.createElement('div');
      questionEl.classList.add('question');
      questionEl.textContent = questionData.question;
      questionContainer.appendChild(questionEl);

      questionData.answers.forEach((answer, index) => {
        const choiceEl = document.createElement('li');
        const buttonEl = document.createElement('button');
        buttonEl.textContent = answer;
        buttonEl.onclick = () => selectAnswer(index, buttonEl, questionData.multiple);
        choiceEl.appendChild(buttonEl);
        choicesEl.appendChild(choiceEl);
      });

      // Appliquer la couleur du niveau
      questionContainer.classList.add(questionData.level);

      startTimer();
    }

    function selectAnswer(index, buttonEl, multiple) {
      if (multiple) {
        if (selectedAnswers.includes(index)) {
          selectedAnswers = selectedAnswers.filter(i => i !== index);
          buttonEl.classList.remove('selected');
        } else {
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
      
      if (selectedButtons.length === 0) {
        alert("Veuillez sélectionner une réponse.");
        return;
      }
      
      const selectedAnswer = Array.from(selectedButtons[0].parentNode.parentNode.children).indexOf(selectedButtons[0].parentNode);
      if (selectedAnswer === questionData.correct) {
        selectedButtons[0].classList.add('correct');
      } else {
        selectedButtons[0].classList.add('incorrect');
        const correctButton = document.querySelector(`.choices li:nth-child(${questionData.correct + 1}) button`);
        correctButton.classList.add('correct');
      }

      setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
      }, 2000);
    }

    function startTimer() {
      const timerEl = document.getElementById('timer');
      const skipButton = document.getElementById('skip-button');
      skipButton.style.display = 'none'; // Masque le bouton au début

      timerEl.style.width = '100%';
      timerEl.style.transition = 'none';

      setTimeout(() => {
        timerEl.style.transition = 'width 20s linear'; // Durée totale 20 secondes
        timerEl.style.width = '0';
      }, 10);
    }

    document.getElementById('skip-button').onclick = () => {
      clearInterval(timerInterval);
      currentQuestionIndex++;
      showQuestion();
    };

    showQuestion();
  </script>
</body>
</html>
