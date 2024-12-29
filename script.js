const questions = [
  {
    "question": "What is the capital of France?",
    "answer": [
      {
        text: "Paris",
        correct: true
      },
      {
        text: "London",
        correct: false
      },
      {
        text: "Berlin",
        correct: false
      },
      {
        text: "Madrid",
        correct: false
      }
    ]
  },
  {
    "question": "Which planet is known as the Red Planet?",
    "answer": [
      {
        text: "Mars",
        correct: true
      },
      {
        text: "Earth",
        correct: false
      },
      {
        text: "Venus",
        correct: false
      },
      {
        text: "Jupiter",
        correct: false
      }
    ]
  },
  {
    "question": "Who wrote 'Romeo and Juliet'?",
    "answer": [
      {
        text: "William Shakespeare",
        correct: true
      },
      {
        text: "Charles Dickens",
        correct: false
      },
      {
        text: "Jane Austen",
        correct: false
      },
      {
        text: "Mark Twain",
        correct: false
      }
    ]
  },
  {
    "question": "What is the chemical symbol for water?",
    "answer": [
      {
        text: "H2O",
        correct: true
      },
      {
        text: "O2",
        correct: false
      },
      {
        text: "CO2",
        correct: false
      },
      {
        text: "NaCl",
        correct: false
      }
    ]
  },
  {
    "question": "Which continent is the largest by land area?",
    "answer": [
      {
        text: "Asia",
        correct: true
      },
      {
        text: "Africa",
        correct: false
      },
      {
        text: "North America",
        correct: false
      },
      {
        text: "Europe",
        correct: false
      }
    ]
  }
]

const questionElement=document.getElementById("question");
const answerEle=document.getElementById("answer-buttons")
const nextBtn=document.getElementById("next-btn")


let currentQuestionIndex=0;
let score=0;

function startQuiz() {
  currentQuestionIndex=0;
  score=0;
  nextBtn.innerHTML="Next";
  showQuestion();
}



function showQuestion(){
  resetState();
  let currentQuestion=questions[currentQuestionIndex];
  let questionNo=currentQuestionIndex+1;
  questionElement.innerHTML=questionNo+". "+currentQuestion.question;

  currentQuestion.answer.forEach(answer=>{
    const button=document.createElement("button");
    button.innerHTML=answer.text;
    button.classList.add("btn");
    answerEle.appendChild(button);
    if(answer.correct){
      button.dataset.correct=answer.correct;
    }
    button.addEventListener("click",selectAnswer);
  });
}



function resetState(){
  nextBtn.style.display="none"
  while(answerEle.firstChild){
    answerEle.removeChild(answerEle.firstChild)
  }
}


function selectAnswer(e){
  const selectedBtn=e.target;
  const isCorrect=selectedBtn.dataset.correct==="true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }
  else{
    selectedBtn.classList.add("incorrect");
  }
Array.from(answerEle.children).forEach(button=>{
  if(button.dataset.correct==="true"){
    button.classList.add("correct");
  }
  button.disabled=true;
});
nextBtn.style.display="block";
}

function showScore(){
  resetState();
  questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`
  nextBtn.innerHTML="Play Again";
  nextBtn.style.display="block";
}



function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex<questions.length){
    showQuestion();
  }
  else{
    showScore();
  }
}

nextBtn.addEventListener("click",()=>{
  if(currentQuestionIndex<questions.length){
    handleNextButton();
  }
  else{
    startQuiz();
  }
})

startQuiz()