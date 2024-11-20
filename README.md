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
    /* Style pour les carrés */
    .question-square {
      width: 20px;
      height: 20px;
      background-color: #ddd;
      margin: 5px;
      display: inline-block;
      border-radius: 4px;
      cursor: pointer;
    }
    .question-square.correct {
      background-color: green;
    }
    .question-square.incorrect {
      background-color: red;
    }
    #question-squares {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      max-width: 200px;
    }
    #score-container {
      display: none;
      margin-top: 20px;
      font-size: 24px;
      font-weight: bold;
    }
    .end-container {
      text-align: center;
      padding: 20px;
    }
    .end-container button {
      margin-top: 20px;
      background-color: #007bff;
      color: white;
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
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
  <button id="quit-button" style="display: none;">Quitter</button>

  <div id="question-squares"></div>
  <div id="score-container">Votre score : <span id="score">0</span>/40</div>

  <script>
    const questions = [
      { question: "Quel est le rôle principal d'un scan de vulnérabilités ?", answers: ["Identifier les logiciels installés", "Détecter les vulnérabilités connues", "Supprimer les malwares", "Mettre à jour le système"], correct: 1, multiple: false },
      { question: "Quel outil est utilisé pour scanner les vulnérabilités ?", answers: ["Nessus", "Adobe Reader", "Photoshop", "VLC"], correct: 0, multiple: false },
      // Ajoute ici toutes les autres questions
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timerInterval;
    let selectedAnswers = [];

    // Mélange les questions et réponses
    shuffleArray(questions);
    questions.forEach(question => {
      const correctAnswer = question.answers[question.correct];
      shuffleArray(question.answers);
      question.correct = question.answers.indexOf(correctAnswer);
    });

    // Créer les carrés pour chaque question
    function createQuestionSquares() {
      const questionSquaresContainer = document.getElementById('question-squares');
      for (let i = 0; i < 40; i++) {
        const square = document.createElement('div');
        square.classList.add('question-square');
        square.dataset.index = i;
        square.onclick = () => goToQuestion(i);
        questionSquaresContainer.appendChild(square);
      }
    }

    // Mise à jour de l'affichage des carrés (corrects/incorrects)
    function updateQuestionSquare() {
      const squares = document.querySelectorAll('.question-square');
      const square = squares[currentQuestionIndex];
      if (selectedAnswers[0] === questions[currentQuestionIndex].correct) {
        square.classList.add('correct');
      } else {
        square.classList.add('incorrect');
      }
    }

    // Affichage de la question actuelle
    function showQuestion() {
      if (currentQuestionIndex >= questions.length) {
        showFinalScore();
        return;
      }

      selectedAnswers = [];
      const questionData = questions[currentQuestionIndex];
      const questionContainer = document.getElementById('question-container');
      const questionNumberEl = document.getElementById('question-number');
      const responseInfoEl = document.getElementById('response-info');
      const choicesEl = document.getElementById('choices');
      
      questionContainer.innerHTML = '';
      choicesEl.innerHTML = '';

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
        buttonEl.onclick = () => selectAnswer(index, buttonEl, questionData.multiple);
        choiceEl.appendChild(buttonEl);
        choicesEl.appendChild(choiceEl);
      });

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
      if (selectedAnswers.length === 1 && selectedAnswers[0] === questionData.correct) {
        score++;
      }
      updateQuestionSquare();
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
          showQuestion();
        }, 1000);
      } else {
        showFinalScore();
      }
    }

    // Timer pour chaque question
    let timerDuration = 30;
    function startTimer() {
      const timerEl = document.getElementById('timer');
      timerEl.style.width = '100%';
      timerDuration = 30;
      timerInterval = setInterval(() => {
        timerDuration--;
        timerEl.style.width = `${(timerDuration / 30) * 100}%`;
        if (timerDuration === 0) {
          handleAnswer();
        }
      }, 1000);
    }

    // Fonction de fin de quiz
    function showFinalScore() {
      document.getElementById('qcm-container').innerHTML = `<div class="end-container">
        <h2>Votre score : ${score}/40</h2>
        <button onclick="location.reload()">Recommencer</button>
      </div>`;
    }

    // Cacher le score
    document.getElementById('score').textContent = score;

    // Bouton Quitter
    document.getElementById('quit-button').addEventListener('click', showFinalScore);

    // Initialisation du quiz
    createQuestionSquares();
    showQuestion();
  </script>
</body>
</html>
