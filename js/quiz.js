document.addEventListener("DOMContentLoaded", () => {

const questions = [
  {
    question: "Când ai un deadline peste 2 săptămâni, ce faci?",
    answers: [
      { text: "Îl notez și îl ignor elegant", score: 2 },
      { text: "Mă apuc cu o zi înainte", score: 3 },
      { text: "Îl împart în pași mici", score: 0 },
      { text: "Mă gândesc la el constant fără să fac nimic", score: 2 }
    ]
  },
  {
    question: "Cum arată o săptămână normală pentru tine?",
    answers: [
      { text: "Haotic, dar surprinzător funcțional", score: 2 },
      { text: "Totul se rezolvă pe ultima sută", score: 3 },
      { text: "Relativ clară, cu excepții", score: 1 },
      { text: "Nu știu ce zi e azi", score: 3 }
    ]
  },
  {
    question: "De ce amâni cel mai des?",
    answers: [
      { text: "Nu știu de unde să încep", score: 2 },
      { text: "Mi se pare prea mult", score: 2 },
      { text: "Perfecționism", score: 1 },
      { text: "Prefer să nu mă gândesc", score: 3 }
    ]
  }
];

let currentQuestion = 0;
let totalScore = 0;
let selectedScore = null;

const startBtn = document.getElementById("startQuiz");
const quizSection = document.getElementById("quizSection");
const questionBox = document.getElementById("questionBox");
const nextBtn = document.getElementById("nextBtn");
const resultSection = document.getElementById("resultSection");

startBtn.addEventListener("click", () => {
  document.querySelector(".quiz-intro").classList.add("hidden");
  quizSection.classList.remove("hidden");
  loadQuestion();
});

function loadQuestion() {
  selectedScore = null;
  const q = questions[currentQuestion];

  // Dynamic animation
  questionBox.innerHTML = `
    <h3>${q.question}</h3>
    <div class="answers-container">
      ${q.answers.map(a =>
        `<div class="answer" data-score="${a.score}">${a.text}</div>`
      ).join('')}
    </div>
  `;

  const answerElements = document.querySelectorAll(".answer");
  answerElements.forEach(answer => {
    answer.addEventListener("click", () => {
      answerElements.forEach(a => a.classList.remove("selected"));
      answer.classList.add("selected");
      selectedScore = parseInt(answer.dataset.score);
    });
  });
}

nextBtn.addEventListener("click", () => {
  if (selectedScore === null) {
    alert("Alege o opțiune ca să treci mai departe!");
    return;
  }
  totalScore += selectedScore;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  const title = document.getElementById("resultTitle");
  const text = document.getElementById("resultText");

  if (totalScore <= 2) {
    title.textContent = "Haos controlat (rar, dar real)";
    text.textContent =
      "Ai deja o structură decentă. Nu perfectă, dar funcțională. Ai nevoie de ajustări, nu de reinventare.";
  } else if (totalScore <= 5) {
    title.textContent = "Haos funcțional, dar obositor";
    text.textContent =
      "Te descurci, dar cu mult stres inutil. Câteva sisteme simple ți-ar salva timp și nervi.";
  } else {
    title.textContent = "Haos pur, supraviețuire zilnică";
    text.textContent =
      "Nu ești leneș. Ești copleșit. Fără structură, totul pare urgent și imposibil.";
  }
}

});
