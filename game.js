const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = true;
let score  = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

// Constants.
const correctBonus = 10;
const maxQuestions = 3

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        localStorage.setItem("mostRecentScore", score);
        // Returns user to the end page as there are no more available questions.
        return window.location.assign("end.html");
    }

    questionCounter++;
    progressText.innerText = `Question: ${questionCounter}/${maxQuestions}`;
    // Updates the progress bar for each question completed.
    console.log(questionCounter/maxQuestions)*100;
    progressBarFull.style.width = `${(questionCounter/maxQuestions)*100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", event => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

            if (classToApply === "correct") {
                incrementScore(correctBonus);
            }

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

    });
});

incrementScore = number => {
    score +=number;
    scoreText.innerText = score;
}

startGame();