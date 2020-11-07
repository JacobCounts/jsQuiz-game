const startBtn = document.querySelector("#start");
const startPrompt = document.querySelector("#start-prompt");
const questionContainer = document.querySelector("#question-container");
const questionText = document.querySelector("#question-text");
const answerDiv = document.querySelector("#answers");

const questions = [
  {
    text: "Is the sky blue?",
    answers: ["True", "False"],
    correctIndex: 0,
  },
  {
    text: "What is Tuckers dogs name?",
    answers: ["Avery", "Deku", "Meems", "Ginger"],
    correctIndex: 2,
  },
  { 
    text: "What is my cats name?",
    answers: ["Sunday", "Monday", "Wednesday", "Friday"],
    correctIndex: 2,
  },
];
let questionIndex = 0;

// registering a click event handler
startBtn.addEventListener("click", handleStartClick);
answerDiv.addEventListener("click", handleAnswerClick);

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
    console.log("That was correct");
  } else {
    // else remove 10 seconds from the time move onto next question
    console.log("That was incorrect");
  }
  questionIndex++;
  // do we even have anymore question to render?
  // if not end the game
  // else render the question
  renderQuestion();
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
    btn.setAttribute("class", "btn btn-primary");
    // set the text of our button to our answers text
    btn.textContent = answer;
    // append the button to the answers div
    answerDiv.appendChild(btn);
  }
}
