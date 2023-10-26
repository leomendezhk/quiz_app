// Get references to HTML elements
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

// Initialize variables for the quiz game
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let Questions = " ";

// Check the category and assign the JSON file accordingly
window.onload = function () {
  if (document.title == "General Knowledge") {
    Questions = "GK.json";
    initialize();
  } else if (document.title == "Computer Science") {
    Questions = "CS.json";
    initialize();
  } else {
    Questions = "Politics.json";
    initialize();
  }
};

// Initialize the quiz by fetching questions from a JSON file
initialize = () => {
  fetch(Questions)
    .then((res) => {
      return res.json();
    })
    .then((loadedQuestions) => {
      // Process loaded questions from the JSON file
      questions = loadedQuestions.results.map((loadedQuestion) => {
        const formattedQuestion = {
          question: loadedQuestion.question,
        };

        // Format the questions and answer choices
        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
        answerChoices.splice(
          formattedQuestion.answer - 1,
          0,
          loadedQuestion.correct_answer
        );

        answerChoices.forEach((choice, index) => {
          formattedQuestion["choice" + (index + 1)] = choice;
        });

        return formattedQuestion;
      });

      // Start the game after loading questions
      startGame();
    })
    .catch((err) => {
      console.error(err);
    });
};

// Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

// Start the quiz game
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

// Get a new question and update the quiz interface
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // Store the score and go to the game over page
    localStorage.setItem("mostRecentScore", score);
    return window.location.replace("../pages/gameover.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter} / ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

// Event listeners for user's choice selection
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    // Update the score based on the user's choice
    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    } else if (classToApply === "incorrect") {
      decrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

// Function to increment the score
incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

// Function to decrement the score
decrementScore = (num) => {
  score -= num - 5;
  scoreText.innerText = score;
};
