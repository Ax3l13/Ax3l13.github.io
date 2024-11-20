<!DOCTYPE html>
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
      { question: "Comment créer un site web ?", answers: ["A", "B", "C", "D"], correct: 0, multiple: false },
      { question: "Question facile 1?", answers: ["A", "B", "C", "D"], correct: [0, 1], multiple: true },
      // Ajoutez d'autres questions ici...
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
