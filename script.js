const startBtn = document.querySelector("#start");
const startPrompt = document.querySelector("#start-prompt");
const questionContainer = document.querySelector("#question-container");
const questionText = document.querySelector("#question-text");
const answerDiv = document.querySelector("#answers");
const endPrompt = document.querySelector("#end-prompt");
const gameOver = document.querySelector(".gameOver");
const userScoreEl = document.querySelector("#score");
const submitHigh = document.querySelector("#submit-high");
const timeLeftDisplay = document.querySelector("#time");

const questions = [
  {
    text: "How many stripes are on the American flag?",
    answers: ["50", "10", "13", "15"],
    correctIndex: 2,
  },
  {
    text: "Who was the first American president?",
    answers: [
      "Abraham Lincoln",
      "John Adams",
      "Andrew Jackson",
      "George Washington",
    ],
    correctIndex: 3,
  },
  {
    text: "When was the Declaration of Independence signed?",
    answers: [
      "July 4th 1776",
      "July 4th 1786",
      "July 4th 1906",
      "July 4th 1766",
    ],
    correctIndex: 0,
  },
  {
    text: "In what state is Mount Rushmore located?",
    answers: ["Noth Dakota", "Iowa", "South Dakota", "Montana"],
    correctIndex: 2,
  },
  {
    text: "Which president is on the $50 bill?",
    answers: ["Franklin", "Grant", "Jefferson", "Jackson"],
    correctIndex: 1,
  },
  {
    text: "What state is the Liberty Bell located?",
    answers: ["Pennsylvania", "Washington DC", "California", "Florida"],
    correctIndex: 0,
  },
  {
    text: "What is the longest river in the USA?",
    answers: ["Mississippi", "Colorado", "Yukon", "Missouri"],
    correctIndex: 3,
  },
  {
    text: "Where is the Statue of Liberty located?",
    answers: ["New York", "New Jersey", "Washington DC", "Pennsylvania"],
    correctIndex: 0,
  },
  {
    text: "What year was the Boston Tea Party?",
    answers: ["1873", "1809", "1773", "1776"],
    correctIndex: 2,
  },
  {
    text: "Who created the first American flag ?",
    answers: ["Rick Ross", "George Washington", "Bob Ross", "Betsy Ross"],
    correctIndex: 3,
  },
];

let questionIndex = 0;

// registering a click event handler
startBtn.addEventListener("click", handleStartClick);
answerDiv.addEventListener("click", handleAnswerClick);
let timer;
function countDown() {
  timer = setInterval(function () {
    if (timeLeft <= 0) {
      timeLeftDisplay.innerHTML = 0;

      endScreen();
    }
    timeLeftDisplay.innerHTML = timeLeft;
    timeLeft -= 1;
  }, 1000);
}
function handleAnswerClick(e) {
  e.preventDefault();

  if (!e.target.matches("button")) return;

  // did the user answer correctly
  // store the users answers
  const userAnswer = e.target.textContent;
  // retrieve current question
  const question = questions[questionIndex];
  // access the correct answer
  const correctAnswer = question.answers[question.correctIndex];
  // compare to the answer the user selected
  if (userAnswer === correctAnswer) {
    // if they answered correctly move onto the next question
    score += 5;
  } else {
    timeLeft -= 10;

    // else remove 10 seconds from the time move onto next question
  }

  questionIndex++;
  // do we even have anymore question to render?
  // if not end the game
  if (questionIndex >= questions.length) {
    endScreen();
    //console.log("no more question")
  }
  // else render the question
  else {
    //console.log("more questions")
    renderQuestion();
  }
}

function handleStartClick(e) {
  // start my timer -> TODO
  // hide my start prompt
  startPrompt.style.display = "none";
  // show my question container
  questionContainer.style.display = "block";

  renderQuestion();
}

function renderQuestion() {
  // create a variable to store our current question
  const currentQuestion = questions[questionIndex];
  //set the text content for our html element that displays our question
  questionText.textContent = currentQuestion.text;

  // clear out all previous answer buttons
  answerDiv.innerHTML = "";
  // create a button for each potential answer
  for (let i = 0; i < currentQuestion.answers.length; i++) {
    // create a variable to store our answer text
    const answer = currentQuestion.answers[i];
    //create a button
    const btn = document.createElement("button");
    // set class="btn btn-primary" on our button
    btn.setAttribute("class", "btn btn-dark");
    // set the text of our button to our answers text
    btn.textContent = answer;
    // append the button to the answers div
    answerDiv.appendChild(btn);
  }
}
let timeLeft = 30;
// countDown timer
// document.addEventListener("DOMContentLoaded",  function() {

// })

// end of game
function endScreen() {
  questionContainer.style.display = "none";
  gameOver.style.display = "block";
  time.style.display = "none";
  clearInterval(timer);
  document.querySelector("#score-btn").textContent = timeLeft;
}

var score = 0;
var currentQ = 0;
startBtn.addEventListener("click", countDown);
submitHigh.addEventListener("click", submitHighScore);

function submitHighScore() {
  gameOver.style.display = "none";
  document.querySelector("#highScores").style.display = "block";
  var initials = document.querySelector("#final").value;
  var score = document.querySelector("#score-btn").textContent;

  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push({ score, initials });
  localStorage.setItem("highScores", JSON.stringify(highScores));
  
  highScores = highScores.sort((a, b) => b.score - a.score);
  var list = document.querySelector("#highScoreList");

  for (let i = 0; i < highScores.length; i++) {
    const s = highScores[i];

    var liel = document.createElement("li");
    liel.textContent = s.initials + ":" + s.score;
    list.appendChild(liel);
  }
}
