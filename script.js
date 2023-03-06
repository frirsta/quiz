const questions = [
    {
        question: 'What is 1+2',
        choices:['1', '2', '3', 4],
        answer: 2
    },
    {
        question: 'What is 1+0',
        choices:['1', '2', '3', 4],
        answer: 0
    },
    {
        question: 'What is 1+3',
        choices:['1', '2', '3', 4],
        answer: 3
    },
    {
        question: 'What is 1+5',
        choices:['5', '2', '6', 4],
        answer: 2
    }
];

/**
 * quiz elements
*/
const questionCount = document.querySelector('.question-count');
const questionText = document.querySelector('.question-text');
const choicesContainer = document.querySelector('.choices-container');
const displayCorrect = document.querySelector('.correct-answers');
const displayIncorrect = document.querySelector('.incorrect-answers');
const nextButton = document.querySelector('.next-question-button');
const startSection = document.querySelector('.start-section');
const nameSection = document.querySelector('.name-section');
const gameSection = document.querySelector('.game-section');
const summarySection = document.querySelector('.summary-section');


let questionNumber = 0;
let correct = 0;
let incorrect = 0;
let currentQuestion;
let allQuestions = [];
let allChoices = [];

/* 
 * start button goes to name section
 */
function startButtonEnter(event) {
    event.preventDefault();
    startSection.style.display = "none";
    nameSection.style.display = "flex";
    document.getElementById("username").value = "";
    document.getElementById("username").focus();
    newQuestion();
}
let startQuizButton = document.querySelector(".start-button");
startQuizButton.addEventListener("click", startButtonEnter);

/**
 * Enter name button goes to quiz section
 */
function nameButtonEnter(event) {
    event.preventDefault();
    let inputName = document.getElementById("username").value;
    let inputNameArea = document.getElementById("username");
    let letters = /^[A-Za-z]+$/;
    if (inputName === "") {
        alert("Enter your name!");
    } else if (inputName != inputName.match(letters)) {
        alert("Your name can only include letters");
        inputNameArea.value = "";
        inputNameArea.focus();
    } else {
        nameSection.style.display = "none";
        gameSection.style.display = "flex";
        document.getElementById("username").value = "";
        document.getElementById("username").focus();
        document.getElementById("name-display").innerHTML = inputName;
        startQuiz();
    }
}


function getAllQuestions(){
    const totalQuestion = questions.length;
    for(let i = 0; i < totalQuestion; i++){
        allQuestions.push(questions[i]);
        // console.log(questions[i])
    }
}
function newQuestion(){
    questionCount.innerHTML = "Question " + (questionNumber + 1) + " of " + questions.length;
    let randomQuestionIndex = allQuestions[Math.floor(Math.random() * allQuestions.length)];
    currentQuestion = randomQuestionIndex;
    questionText.innerHTML = currentQuestion.question;
    // console.log(questionText);

    let questionIndex = allQuestions.indexOf(randomQuestionIndex);
    allQuestions.splice(questionIndex, 1);
    // console.log(allQuestions);

    const allChoicesLength = currentQuestion.choices.length;

    for(let i=0; i < allChoicesLength; i++){
        allChoices.push(i);
    }

    choicesContainer.innerHTML = '';

    for(let i = 0; i < allChoicesLength; i++){
    let randomChoiceIndex  = allChoices[Math.floor(Math.random() * allChoices.length)];
    let choiceIndex = allChoices.indexOf(randomChoiceIndex);

    allChoices.splice(choiceIndex,1);

    let choice = document.createElement("div");
    choice.innerHTML = currentQuestion.choices[randomChoiceIndex];
    choice.id = randomChoiceIndex;
    choice.className = "choice";
    choicesContainer.appendChild(choice);
    choice.setAttribute("onClick", "checkResult(this)");
}
    nextButton.style.display = "none";
    questionNumber++
}

/**
 * This function will check if the chosen
 *  choice is correct or incorrect.
 */

function checkResult(choiceElement){
    let id = parseInt(choiceElement.id);
    // console.log(typeof id);
    if(id === currentQuestion.answer){
        // console.log("right answer");
        ++correct;
        choiceElement.classList.add("correct")
        console.log("correct: ", correct);
        displayCorrect.innerHTML = correct;
        nextButton.style.display = "flex";
    }
    else{
        console.log("answer is wrong")
        ++incorrect;
        choiceElement.classList.add("incorrect");
        let choicesLength = choicesContainer.children.length;
        for(let i = 0; i < choicesLength; i++){
            if(parseInt(choicesContainer.children[i].id) === currentQuestion.answer){
                choicesContainer.children[i].classList.add("correct");
            }
        }
        nextButton.style.display = "flex";
    }
    notClickable();
    
}


function notClickable(){
    let choicesLength = choicesContainer.children.length;
    for(let i = 0; i < choicesLength; i++){
        choicesContainer.children[i].classList.add("choice-answered");
    }
}

function nextQuestion() {
    if(questionNumber === questions.length) {
        console.log('game over');
        getSummaryPage();
    }
    else{
        newQuestion();
    }
}
/* 
 * get summary page
 */
function getSummaryPage() {
    gameSection.style.display = "none";
    summarySection.style.display = "flex";
    displayCorrect.innerHTML = "Correct: " + correct;
    displayIncorrect.innerHTML = "Incorrect: " + incorrect;
}
function resetData() {
    questionNumber = 0;
    correct = 0;
    incorrect = 0;
}

function playAgain(){
    summarySection.style.display = "none";
    gameSection.style.display = "flex";
    resetData();
    startQuiz();
}
function homePageEnter() {
    summarySection.style.display = "none";
    startSection.style.display = "flex";
    resetData();
}


function startQuiz(){
    nameSection.style.display = "none";
    gameSection.style.display = "flex";
    getAllQuestions();
    newQuestion();

}
