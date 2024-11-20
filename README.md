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
  { question: "Quelle est la première étape pour configurer une machine virtuelle vulnérable ?", answers: ["A. Installer un système d'exploitation vulnérable", "B. Installer un logiciel antivirus", "C. Mettre à jour le système d'exploitation", "D. Activer les mises à jour automatiques"], correct: 0, multiple: false },
  { question: "Quel outil peut être utilisé pour scanner les vulnérabilités d'un système ?", answers: ["A. Nessus", "B. Adobe Reader", "C. Microsoft Office", "D. Google Chrome"], correct: 0, multiple: false },
  { question: "Qu'est-ce qu'une vulnérabilité critique ?", answers: ["A. Une faille mineure", "B. Une faille facilement exploitable", "C. Une faille non-exploitable", "D. Une faille inconnue"], correct: 1, multiple: false },
  { question: "Pourquoi désactiver les mises à jour automatiques sur une machine virtuelle vulnérable ?", answers: ["A. Pour économiser de l'espace disque", "B. Pour améliorer les performances", "C. Pour maintenir la machine vulnérable", "D. Pour éviter les redémarrages"], correct: 2, multiple: false },
  { question: "Quel est l'objectif de l'exploitation des vulnérabilités ?", answers: ["A. Identifier les failles", "B. Mettre à jour le système", "C. Compromettre les données", "D. Améliorer la sécurité"], correct: 2, multiple: false },
  { question: "Qu'est-ce qu'un exploit ?", answers: ["A. Un logiciel antivirus", "B. Un programme utilisé pour exploiter une vulnérabilité", "C. Un pare-feu", "D. Une mise à jour de sécurité"], correct: 1, multiple: false },
  { question: "Quel outil peut identifier les vulnérabilités connues présentes dans un système ?", answers: ["A. OpenVAS", "B. VLC Media Player", "C. Steam", "D. Spotify"], correct: 0, multiple: false },
  { question: "Quelles mesures de protection peuvent être prises après l'exploitation d'une vulnérabilité ?", answers: ["A. Appliquer les correctifs de sécurité", "B. Installer un logiciel antivirus", "C. Configurer un pare-feu", "D. Toutes ces réponses"], correct: 3, multiple: false },
  { question: "Pourquoi est-il important de réexécuter un scan de vulnérabilités après avoir appliqué des mesures de protection ?", answers: ["A. Pour vérifier l'efficacité des mesures", "B. Pour économiser de l'espace disque", "C. Pour améliorer les performances", "D. Pour éviter les redémarrages"], correct: 0, multiple: false },
  { question: "Où peut-on trouver des exploits spécifiques à des vulnérabilités ?", answers: ["A. Exploit Database", "B. Google Docs", "C. Microsoft Excel", "D. Facebook"], correct: 0, multiple: false },
  { question: "Quelle est la première étape lors de l'analyse des vulnérabilités ?", answers: ["A. Créer une machine virtuelle", "B. Désactiver les mises à jour automatiques", "C. Exécuter un scan de vulnérabilités", "D. Appliquer les correctifs de sécurité"], correct: 2, multiple: false },
  { question: "Quel type de système d'exploitation est utilisé pour l'analyse des vulnérabilités dans cette mise en situation ?", answers: ["A. Windows XP", "B. macOS", "C. Linux", "D. Android"], correct: 0, multiple: false },
  { question: "Quel est le but de désactiver les mises à jour automatiques ?", answers: ["A. Pour économiser de l'espace disque", "B. Pour maintenir la machine vulnérable", "C. Pour améliorer les performances", "D. Pour éviter les redémarrages"], correct: 1, multiple: false },
  { question: "Qu'est-ce qu'un scan de vulnérabilités ?", answers: ["A. Un examen des failles de sécurité", "B. Une mise à jour de sécurité", "C. Un logiciel antivirus", "D. Une analyse des performances système"], correct: 0, multiple: false },
  { question: "Pourquoi est-il important d'identifier les vulnérabilités critiques ?", answers: ["A. Pour économiser de l'espace disque", "B. Pour améliorer les performances", "C. Pour corriger les failles les plus dangereuses", "D. Pour éviter les redémarrages"], correct: 2, multiple: false },
  { question: "Quelle est la principale raison pour utiliser un exploit ?", answers: ["A. Pour économiser de l'espace disque", "B. Pour compromettre la sécurité d'un système", "C. Pour améliorer les performances", "D. Pour éviter les redémarrages"], correct: 1, multiple: false },
  { question: "Quelle mesure de protection peut empêcher une exploitation de vulnérabilité ?", answers: ["A. Appliquer les correctifs de sécurité", "B. Désactiver les mises à jour automatiques", "C. Installer des jeux", "D. Utiliser des logiciels pirates"], correct: 0, multiple: false },
  { question: "Quel outil est utilisé pour exécuter un scan de vulnérabilités ?", answers: ["A. OpenVAS", "B. Internet Explorer", "C. Skype", "D. Outlook"], correct: 0, multiple: false },
  { question: "Quel est l'objectif de configurer un pare-feu ?", answers: ["A. Bloquer les tentatives d'accès non autorisées", "B. Améliorer les performances", "C. Économiser de l'espace disque", "D. Désactiver les mises à jour automatiques"], correct: 0, multiple: false },
  { question: "Que faire après avoir appliqué des mesures de protection ?", answers: ["A. Réexécuter le scan de vulnérabilités", "B. Désactiver les mises à jour automatiques", "C. Installer un logiciel antivirus", "D. Appliquer un pare-feu"], correct: 0, multiple: false },
  { question: "Qu'est-ce qu'une machine virtuelle ?", answers: ["A. Un logiciel qui émule un autre système d'exploitation", "B. Un antivirus", "C. Un pare-feu", "D. Un lecteur multimédia"], correct: 0, multiple: false },
  { question: "Pourquoi utiliser une version non mise à jour de Windows XP ?", answers: ["A. Pour étudier les vulnérabilités", "B. Pour économiser de l'espace disque", "C. Pour améliorer les performances", "D. Pour éviter les redémarrages"], correct: 0, multiple: false },
  { question: "Que fait Nessus ?", answers: ["A. Exécute un scan de vulnérabilités", "B. Lit des fichiers multimédia", "C. Gère les courriers électroniques", "D. Édite des documents"], correct: 0, multiple: false },
  { question: "Quelle est l'étape suivante après l'analyse des résultats du scan ?", answers: ["A. Identifier les vulnérabilités critiques", "B. Installer un logiciel antivirus", "C. Désactiver les mises à jour automatiques", "D. Mettre à jour le système"], correct: 0, multiple: false },
  { question: "Pourquoi noter les résultats de l'exploitation ?", answers: ["A. Pour documenter les actions entreprises", "B. Pour économiser de l'espace disque", "C. Pour améliorer les performances", "D. Pour éviter les redémarrages"], correct: 0, multiple: false },
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
        timerEl.style.transition = 'width 10s linear';
        timerEl.style.width = '0%';
      }, 50);
      timerInterval = setTimeout(() => {
        handleAnswer();
      }, 10000);
    }

    showQuestion();
  </script>
</body>
</html>
