var questions = [
    {
        name: "question 1",
        question: "How many cities are there in the United States?",
        answers: ["20", "33", "44", "19354"],
        wrongAnswers: ["20", "33", "44"],
        correctAnswer: "19354"
    },
    {
        name: "question 2",
        question: "In what year was the softdrink 'Fanta' introduced?",
        answers: ["1945", "1940", "2020", "1856"],
        wrongAnswers: ["1945", "2020", "1856"],
        correctAnswer: "1940"
    },
    {
        name: "question 3",
        question: "Who played 'Neo' in the box office smash, 'The Matrix'?",
        answers: ["Keanu Reeves", "Christopher reeves", "Kevin Spacey", "I'm pretty sure it's Kevin Spacey"],
        wrongAnswers: ["Christopher reeves", "Kevin Spacey", "I'm pretty sure it's Kevin Spacey"],
        correctAnswer: "Keanu Reeves"
    },
    {
        name: "question 4",
        question: "What is the fastest land animal?",
        answers: ["Elephant", "Dog", "Cheetah", "I'm gonna go with Kevin Spacey again"],
        wrongAnswers: ["Elephant", "Dog", "I'm gonna go with Kevin Spacey again"],
        correctAnswer: "Cheetah"
    }
]
console.log(questions[1]);

var incorrectNumber = 0;
var correctNumber = 0;
var unansweredNumber = 0;
var globalQuestionNumber = 0;
var intervalId;

var timer = 30;

var resetTimer = function() {
    clearInterval(intervalId);
    timer = 30;
}

var questionTimeout = function() {
    $("#questionCard").hide();
    $("#timeoutCard").show();
    $(".displayCorrectAnswer").text("The correct answer was: " + questions[globalQuestionNumber].correctAnswer);
    unansweredNumber ++;
    globalQuestionNumber ++;
    windowTimeout ();
    resetTimer();
};

var countDown = function() {
    timer --;
    $("#questionTime").text("Time Remaining " + timer);
    if (timer == 0) {
        questionTimeout();
    }
};

var initialize = function() {
    incorrectNumber = 0;
    correctNumber = 0;
    unansweredNumber = 0;
    globalQuestionNumber = 0;
}


$("#bigBox").children().hide();
$("#startCard").show();

var start = function () {
    initialize();
    $("#startCard").hide();
    $("#finishCard").hide();
    $("#questionCard").show();
    displayQuestion(globalQuestionNumber);
};

var windowTimeout = function(){ setTimeout(function() {
    $("#incorrectCard").hide();
    $("#correctCard").hide();
    $("#timeoutCard").hide();
    if(globalQuestionNumber == questions.length) {
        displayFinalCard();
    }
    else {
    $("#questionCard").show();
    displayQuestion(globalQuestionNumber);
    }
    console.log("test");
  }, 3000);
};

var displayFinalCard = function() {
    $("#finishCard").show();
    $("#correctDisplay").text("Correct: " + correctNumber);
    $("#incorrectDisplay").text("Incorrect: " + incorrectNumber);
    $("#unansweredDisplay").text("Unanswered: " + unansweredNumber);
    resetTimer();
}

var chooseWrongAnswer = function() {
    $("#questionCard").hide();
    $("#incorrectCard").show();
    $(".displayCorrectAnswer").text("The correct answer was: " + questions[globalQuestionNumber].correctAnswer);
    incorrectNumber ++;
    globalQuestionNumber ++;
    windowTimeout ();
    resetTimer();
};

var chooseRightAnswer = function() {
    $("#questionCard").hide();
    $("#correctCard").show();
    correctNumber ++;
    globalQuestionNumber ++;
    windowTimeout();
    resetTimer();
};

$(".answerBtn").on("click", function() {
    console.log($(this).text());
    console.log(globalQuestionNumber);
    if ($(this).text() == questions[globalQuestionNumber].correctAnswer) {
        console.log("correct!");
        chooseRightAnswer();
    }
    else {
        chooseWrongAnswer();
    }
});

var displayQuestion = function(globalQuestionNumber) {
    $("#questionTime").text("Time Remaining: 30");
    $("#questionDisplay").text(questions[globalQuestionNumber].question);
    $("#answer1").text(questions[globalQuestionNumber].answers[0]);
    $("#answer2").text(questions[globalQuestionNumber].answers[1]);
    $("#answer3").text(questions[globalQuestionNumber].answers[2]);
    $("#answer4").text(questions[globalQuestionNumber].answers[3]);
    intervalId = setInterval(countDown, 1000);
}

$("#startButton").on("click", function() {
    start();
});

$("#startOver").on("click", function() {
    $("#finishCard").hide();
    start();
});