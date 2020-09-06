const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score  = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Inside which HTML element do we put Javascript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
    },
    {
        question: "How do you create a function in Javascript?",
        choice1: "function myFunction()",
        choice2: "function = myFunction()",
        choice3: "function:myFunction()",
        choice4: "All of the above",
        answer: 1
    },
    {
        question: "Where is the correct place to insert script tags?",
        choice1: "The <head> section",
        choice2: "The <body> section",
        choice3: "The <footer>",
        choice4: "Both the <head> section and the <body> section are correct",
        answer: 4
    },
    {
        question: "How do you correctly add a comment in Javascript?",
        choice1: "//This is a comment",
        choice2: "-This is a comment",
        choice3: "<!--This is a comment-->",
        choice4: "/*This is a comment*/",
        answer: 1
    },
    {
        question: "What is the correct way to write an array in Javascript?",
        choice1: "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
        choice2: "var colors = 'red', 'green', 'blue'",
        choice3: "var colors = ['red', 'green', 'blue']",
        choice4: "var colors = (1:'red', 2:'green', 3:'blue')",
        answer: 3
    },
    {
        question: "How do you write an IF statement in Javascript?",
        choice1: "if i = 5 then",
        choice2: "if (i == 5)",
        choice3: "if i = 5",
        choice4: "if i == 5 then",
        answer: 2
    },
    {
        question: "Which of the following data types are supported by Javascript?",
        choice1: "Number and symbol",
        choice2: "String and symbol",
        choice3: "Boolean and object",
        choice4: "All of the above",
        answer: 4
    },
    {
        question: "Which of the following Javascript built-in methods is paired correctly with the values returned by them?",
        choice1: "push(): It returns the length of the array.",
        choice2: "reverse(): It reverses the last element of an array and returns that element.",
        choice3: "Concat(): It joins two or more strings.",
        choice4: "length(): It returns the character at the specified length.",
        answer: 3
    }
]

// Constants.
const correctBonus = 10;
const maxQuestions = 10;

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
    progressBarFull.style.width = `${(questionCounter/maxQuestions)*100}%`;

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
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

    });
});

incrementScore = number => {
    score +=number;
    scoreText.innerText = score;
};

startGame();