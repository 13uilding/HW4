
var qHDisp = $(".questionHDisplay");
var qDisp = $(".questionDisplay");

// Make this appear along with the questions
qHDisp.attr("style", "display: none");
qDisp.attr("style", "display: none");


// Buttons
$(".btn-secondary").on("click", function(event){
    event.preventDefault();

    console.log("I'm a secondary");
});

$(".btn-primary").on("click", function(event){
    event.preventDefault();

    console.log("I'm a primary");
});

// View High Scores
$(".navbar-brand").on("click", function(event){
    event.preventDefault();

    console.log("I'm the navbar")
});