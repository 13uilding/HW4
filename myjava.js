// Questions
var questions = []
var q1 = {
    question: "Which method doesn't work on an array?", 
    correct: "The .split() method.",
    wrong1: "The .slice() method.",
    wrong2: "The .splice() method.",
    wrong3: "The .join() method."
    };
questions.push(q1);
var q2 = {
    question: "Which tag isn't a self closing tag?", 
    correct: "The <script> tag",
    wrong1: "The <img> tag.",
    wrong2: "The <link> tag.",
    wrong3: "The <meta> tag."
    };
questions.push(q2);
var q3 = {
    question: "Select the correct equality?", 
    correct: "A nested function's this === window.",
    wrong1: "An object's method's this === window.",
    wrong2: "A jQuery button's this === window.",
    wrong3: "In console, this !== window."
    };
questions.push(q3);
var q4 = {
    question: "Which css selector reference is incorrect?", 
    correct: "div p selects all p elements where their immediate parent is a div.",
    wrong1: "#come-on selects all elements with the id come-on",
    wrong2: ".bro selects all elements with the class 'bro'",
    wrong3: "div>p selects all p elements where their immediate parent is a div."
    };
questions.push(q4);
var q5 = {
    question: "Which answer produces the array [0, 1, 2, 3, 4]?", 
    correct: "[...Array(5).keys()]",
    wrong1: "for(let i=0; i<=5; i++) {arr.append[i]}",
    wrong2: "while(var count = 0) !== 5) { count++ }",
    wrong3: "Array(5)"
    };
questions.push(q5);


// Other variables
var qHDisp = $(".questionHDisplay");
var qDisp = $("#questionDisplay");
var tDisp = $(".timer");
var score = 0;
var secondsLeft;
const qArr = ["correct", "wrong1", "wrong2", "wrong3"];
var options = [];
var randQuestions = randomIndexArray(questions);
var newQuestionIndex = 0;

// Make this appear along with the questions
qHDisp.attr("style", "display: none");
qDisp.attr("style", "display: none");


// Buttons
var startBtn = $(".btn-primary");
var ansBtn = $(".btn-outline-secondary");
var highBtn = $(".btn-secondary");

startBtn.on("click", function(event){
    event.preventDefault();
    secondsLeft = 60;
    visualizeEl("start");
    setTime();
    console.log("I'm a start");
});

ansBtn.on("click", function(event){
    event.preventDefault();
    // Add points for getting the correct one
    // Take off time for getting the wrong one
    console.log("I'm " + $(this).attr("value"));
    visualizeEl("newQuestion");

});

highBtn.on("click", function(event){
    event.preventDefault();
    console.log("I'm a high score button");
});

// Timer
function setTime() {
    var timerInterval = setInterval(function() {
      tDisp.text("Timer: " + secondsLeft + "s");
      secondsLeft--;
      // Need this to end if we run out of questions
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        visualizeEl("score");
      }
  
    }, 1000);
};

// Produces a random order for the given array
// !!!! Could improve but works for now
function randomIndexArray(arr){
    var ranIndexArr = [];
    while ( ranIndexArr.length !== arr.length ){
      var index = Math.floor(Math.random() * arr.length);
      if ( ranIndexArr.includes(index) ) {
        continue;
      } else ranIndexArr.push(index);
    };
    var options = []
    for (let i = 0; i < ranIndexArr.length; i++){
      options.push(arr[ranIndexArr[i]]);
    };
    return options;
  };

// Visualizes the different elements on the screen depending on the event
function visualizeEl(event) {
    switch(event) {
        case "start":
            // secondsLeft = 60;
            startBtn.attr("style", "display: none");
            visualizeEl("newQuestion");
            qHDisp.attr("style", "display: block");
            qDisp.attr("style", "display: block");
            // qHDisp.addClass("d-flex justify-content-center");
            break;
        case "score":
            tDisp.text("Timer");
            startBtn.attr("style", "display: none");
            qDisp.attr("style", "display: none");
            // qHDisp.attr("style", "display: block");
            qHDisp.text("Your Score:");  
            // logScore(); 
            break;        
        case "newQuestion":
            var currentQuestion = randQuestions[newQuestionIndex];
            options = randomIndexArray(qArr);
            for (let i = 0; i < qArr.length; i++){
                $(`#${i}`).text(currentQuestion[options[i]]);
            };
            qHDisp.text(currentQuestion.question);
            newQuestionIndex++;
            if (newQuestionIndex === questions.length){
                // Add bonus for ending early
                visualizeEl("score");
            };
            break;
            // qHDisp.empty();
            // qDisp.empty();

        
        // startBtn.setAttribute("style", "display: block");
        // quizQuestions.setAttribute("style", "display: none");
    }
}



