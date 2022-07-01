var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var gamePattern = [];
//console.log(gamePattern);

var started = false;

var level = 0;

var index = 0;

$(document).ready(() => {
    $(document).keypress(() => {
        if (!started) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    });
});

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    //return randomNumber;

    var randomChosenColour = buttonColours[randomNumber];
    //console.log(randomChosenColour);

    gamePattern.push(randomChosenColour);
    //console.log(nextSequence());

    $(document).ready(function () {
        $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    });

    playSound(randomChosenColour);
}
//console.log(nextSequence());
//nextSequence();

$(".btn").click(function () {                   
    // Here we cannot use arrow function instead of normal function in JQ.

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userChosenColour.attr);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("Success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }

    else {
        console.log("Wrong");
        $("#level-title").text("Game over, press any key to restart!");
        var audioo = new Audio("sounds/wrong.mp3");
        audioo.play();
        $(document).ready(function () {
            $("#abc").addClass("game-over")
        });
        setTimeout(() => {
            $("#abc").removeClass("game-over");
        }, 170);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $(document).ready(function () {
        $("#" + currentColour).addClass("pressed")
    });
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 70);
}
