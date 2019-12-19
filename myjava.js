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
var scoreCard = $(".card");
var startBtn = $(".btn-primary");
var ansBtn = $(".btn-outline-secondary");
var highBtn = $(".btn-secondary");
var highScoreDisplay = $(".highScoreDisplay")
var nameScore = $("#nameScore")
var nameScoreForm = $(".nameScoreForm")
visualizeEl();
var subtractTime = false;
var outofQuestions = false;
var userScore = 0;
var bonus = 0;
var score = 0;
var mistakes = 0;
var newQuestionIndex = 0;
var secondsLeft = 60;
var highScores = {};
var options = [];
const qArr = ["correct", "wrong1", "wrong2", "wrong3"];
var randQuestions = randomIndexArray(questions);


// Start button
startBtn.on("click", function(event){
    event.preventDefault();
    subtractTime = false;
    outofQuestions = false;
    userScore = 0;
    bonus = 0;
    score = 0;
    mistakes = 0;
    newQuestionIndex = 0;
    secondsLeft = 60;
    visualizeEl("start");
    setTime();
});

// Answer buttons Add hovering and change the click interaction
ansBtn.on("click", function(event){
    event.preventDefault();
    if ($(this).text() === randQuestions[newQuestionIndex].correct){
        score++;
        // Change the color here
    } else {
        subtractTime = true;
        mistakes++;
        // Change the color here
    };
    newQuestionIndex++;
    if (newQuestionIndex === questions.length){
        outofQuestions = true;
        bonus = secondsLeft;
        visualizeEl("score");
        return false;
    };
    visualizeEl("newQuestion");
});

// Input Form
nameScoreForm.on("submit", function(event){
    event.preventDefault();
    console.log("PLEASE!")
    console.log(nameScore[0].value);
    console.log(userScore);
    highScores[nameScore[0].value] = userScore;
    nameScore[0].value = "";
    visualizeEl();
    console.log(highScores)
    // nameScore.text();
});


// High score button
highBtn.on("click", function(event){
    event.preventDefault();
    console.log("I'm a high score button");
    // var storedHighScores = JSON.parse(localStorage.getItem("highScores"));
    // if (storedHighScores !== null) {
    //     highScores = storedHighScores;
    // };
    // visualizeEl("viewHighScores")

});


    // function storeHighScores() {
    //     localStorage.setItem("highScores", JSON.stringify(highScores));
    //   }
      //!!! Make a 
    //   // When form is submitted...
    //   highScoreForm.on("submit", function(event) {
    //     event.preventDefault();
    //==========================================================   
    //     var todoText = todoInput.value.trim();
      
    //     // Return from function early if submitted todoText is blank
    //     if (todoText === "") {
    //       return;
    //     }
      // Add new todoText to todos array, clear the input
//   todos.push(todoText);
//   todoInput.value = "";

//   // Store updated todos in localStorage, re-render the list
//   storeTodos();
//   renderTodos();
// });


// Timer
function setTime() {
    var timerInterval = setInterval(function() {
      tDisp.text("Timer: " + secondsLeft + "s");
      secondsLeft--;
      if (subtractTime){
          if (secondsLeft > 15){
              secondsLeft -= 15;
              subtractTime = false;
          } else {
              secondsLeft = 0;
              subtractTime = false;
          };
        };
      // Need this to end if we run out of questions
      if(secondsLeft === 0 || outofQuestions) {
        clearInterval(timerInterval);
        visualizeEl("score");
      }
  
    }, 1000);
};

// Produces a random order for the given array
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
        // case "initial":
        //     qHDisp.attr("style", "display: none");
        //     qDisp.attr("style", "display: none");
        //     scoreCard.attr("style", "display: none");
        //     nameScoreForm.attr("style", "display: none");

            // break;
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
            qHDisp.attr("style", "display: none");
            qDisp.attr("style", "display: none");
            scoreCard.attr("style", "display: block");
            userScore = score + bonus - mistakes;
            $(".card-title").text(userScore);
            nameScoreForm.attr("style", "display: block");
            break;        
        case "newQuestion":
            var currentQuestion = randQuestions[newQuestionIndex];
            // Add the pause here
            options = randomIndexArray(qArr);
            for (let i = 0; i < qArr.length; i++){
                $(`#${i}`).text(currentQuestion[options[i]]);
            };
            qHDisp.text(currentQuestion.question);
            break;
        case "viewHighScores":
            console.log("Add the local storage element.");

        default:
            qHDisp.attr("style", "display: none");
            qDisp.attr("style", "display: none");
            scoreCard.attr("style", "display: none");
            nameScoreForm.attr("style", "display: none");
            startBtn.attr("style", "display: block");
            randQuestions = randomIndexArray(questions);
            // highScoreDisplay.empty();
    //     // ClearhighScores element and update todoCountSpan
    //    highScoreDisplay.innerHTML = "";      
    //     // Render a new li for each score
    //     // Make sure to sort the array so that it displays in order
    //     for (var i = 0; i < highScores.length; i++) {
    //       var score = highScores[i];
    //       var li = document.createElement("li");
    //       li.textContent = score;
    //       li.setAttribute("data-index", i);
    //       var button = document.createElement("button");
    //       button.textContent = "Complete";
    //       li.appendChild(button);
    //      highScoreDisplay.appendChild(li);
    //     }
        // Default
    }
}




