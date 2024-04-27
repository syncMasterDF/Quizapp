import formatData from "./helper.js";

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questiontext = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("score");
const nextbutton = document.getElementById("next-button");
const finishbutton = document.getElementById("finish-button");
const questionNumber = document.getElementById("Question-Number");
const error = document.getElementById("error");

const COREECT_BONUS = 5;
const URL = "https://opentdb.com/api.php?amount=10&category=19&type=multiple";
let formattedData = null;
let questionindex = 0;
let correctAnswer = null;
let score = 0;
let isAccepted = true;

const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    formattedData = formatData(json.results);
    start();
  } catch (err) {
    loader.style.display = "none";
    error.style.display = "block";
  }
};

const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
  questionNumber.innerText = questionindex + 1;
  const { question, answers, correctAnswerIndex } =
    formattedData[questionindex];
  correctAnswer = correctAnswerIndex;
  console.log(correctAnswer);
  questiontext.innerText = question;
  answerList.forEach((button, index) => {
    button.innerText = answers[index];
  });
};

const checkAnswer = (event, index) => {
  if (!isAccepted) return;
  isAccepted = false;
  const isCorrect = index === correctAnswer ? true : false;
  if (isCorrect) {
    event.target.classList.add("correct");
    score += COREECT_BONUS;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
  }
};

const nextHandler = () => {
  questionindex++;
  console.log(questionindex);

  if (questionindex < formattedData.length) {
    isAccepted = true;
    removeClasses();
    showQuestion();
  } else {
    finishHandler();
  }
};

const removeClasses = () => {
  answerList.forEach((button) => (button.className = "answer-text"));
};

const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("end.html");
};

window.addEventListener("load", fetchData);
nextbutton.addEventListener("click", nextHandler);
finishbutton.addEventListener("click", finishHandler);
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => checkAnswer(event, index));
});
