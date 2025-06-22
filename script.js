const questions = [
  {
    question: "What is the capital of India?",
    options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
    answer: "Delhi"
  },
  {
    question: "Which language runs in the browser?",
    options: ["Java", "Python", "JavaScript", "C++"],
    answer: "JavaScript"
  },
  {
    question: "Who is the founder of Microsoft?",
    options: ["Steve Jobs", "Elon Musk", "Bill Gates", "Mark Zuckerberg"],
    answer: "Bill Gates"
  }
];

let current = 0;
let score = 0;
let time = 30;
let timer;

const questionBox = document.getElementById("question");
const optionList = document.getElementById("options");
const resultBox = document.getElementById("result");
const timeDisplay = document.getElementById("time");
const nextBtn = document.getElementById("next");

function showQuestion() {
  clearInterval(timer);
  startTimer();

  const q = questions[current];
  questionBox.textContent = q.question;
  optionList.innerHTML = "";

  q.options.forEach(option => {
    const li = document.createElement("li");
    li.innerHTML = `<input type="radio" name="option" value="${option}" /> ${option}`;
    optionList.appendChild(li);
  });

  resultBox.textContent = "";
}

function nextQuestion() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an option!");
    return;
  }

  if (selected.value === questions[current].answer) {
    score++;
  }

  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function startTimer() {
  time = 30;
  timeDisplay.textContent = time;

  timer = setInterval(() => {
    time--;
    timeDisplay.textContent = time;

    if (time === 0) {
      clearInterval(timer);
      nextQuestion(); // Auto move to next if time ends
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timer);
  questionBox.textContent = "Quiz Completed!";
  optionList.innerHTML = "";
  nextBtn.style.display = "none";
  resultBox.innerHTML = `✅ You scored <b>${score}</b> out of <b>${questions.length}</b>`;
}

nextBtn.addEventListener("click", nextQuestion);

showQuestion();
