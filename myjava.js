
var qHDisp = $(".questionHDisplay");
var qDisp = $(".questionDisplay");
var tDisp = $(".timer");
var score = 0;
var secondsLeft = 60;

// Make this appear along with the questions
qHDisp.attr("style", "display: none");
qDisp.attr("style", "display: none");


// Buttons
var startBtn = $(".btn-primary");
var ansBtn = $(".btn-outline-secondary");
var highBtn = $(".btn-secondary");

startBtn.on("click", function(event){
    event.preventDefault();
    setTime();
    console.log("I'm a start");
});

ansBtn.on("click", function(event){
    event.preventDefault();
    console.log("I'm " + $(this).attr("value"));
});

highBtn.on("click", function(event){
    event.preventDefault();
    console.log("I'm a high score button");
});

// Timer
function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      visualizeEl("start");
      // Need this to end if we run out of questions
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        visualizeEl("score");
      }
  
    }, 1000);
};

function visualizeEl(event) {
    switch(event) {
        case "start":
            secondsLeft = 60;
            tDisp.text("Timer: " + secondsLeft + "s");
            startBtn.attr("style", "display: none");
            qDisp.attr("style", "display: block");
            qHDisp.attr("style", "display: block");
            break;
        case "score":
            tDisp.text("Timer");
            startBtn.attr("style", "display: none");
            qDisp.attr("style", "display: none");
            // qHDisp.attr("style", "display: block");
            qHDisp.text("Your Score:");  
            // logScore(); 
            break;         

        
        // startBtn.setAttribute("style", "display: block");
        // quizQuestions.setAttribute("style", "display: none");
    }
}