const questions = [
  {
    question: "Who is the GOAT?",
    answers: [
      { text: "Babar Azam", correct: false },
      { text: "Virat Kohli", correct: true },
      { text: "Shaheen Afridi", correct: false },
      { text: "Babar Sheikh", correct: false }
    ]
  },
  {
    question: "Who won the FIFA World Cup in 2022?",
    answers: [
      { text: "Brazil", correct: false },
      { text: "France", correct: false },
      { text: "Argentina", correct: true },
      { text: "Germany", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Venus", correct: false }
    ]
  },
  {
    question: "What is the capital of Japan?",
    answers: [
      { text: "Seoul", correct: false },
      { text: "Beijing", correct: false },
      { text: "Tokyo", correct: true },
      { text: "Bangkok", correct: false }
    ]
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    answers: [
      { text: "Oxygen", correct: true },
      { text: "Gold", correct: false },
      { text: "Osmium", correct: false },
      { text: "Iron", correct: false }
    ]
  }
];

const questionEl = document.querySelector(".question");
const answerBtn = document.querySelector(".answer-ques");
const nextBtn = document.querySelector(".next-btn");

let currentQuesIndex = 0;
let score = 0;

function startQuiz() {
  currentQuesIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuesIndex];
  questionEl.innerHTML = `${currentQuesIndex + 1}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add(
      "btn",
      "w-full",
      "hover:bg-pink-400",
      "font-semibold",
      "border-4",
      "border-black",
      "p-[10px]",
      "m-[10px]",
      "text-left"
    );
    if (answer.correct) {
      button.dataset.correct = "true";
    }
    button.addEventListener("click", selectAnswer);
    answerBtn.appendChild(button);
  });

  nextBtn.style.display = "none";
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  const allButtons = answerBtn.querySelectorAll("button");
  allButtons.forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") {
      btn.classList.add("bg-orange-500", "text-white");
    } else {
      btn.classList.add("bg-pink-400", "text-white");
    }
  });

  if (isCorrect) {
    score++;
  }

  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuesIndex++;
  if (currentQuesIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionEl.innerHTML = `You scored ${score} out of ${questions.length}! 🎉`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
  nextBtn.addEventListener("click", startQuiz);
}

startQuiz();
