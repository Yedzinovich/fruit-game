var playing = false;
var score;
var trialsLeft = 0;
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
var step;
var action;

$(function(){
    //if playing
$("#startreset").click(function(){
    if(playing){
        location.reload();
    }
    else{
        playing = true;
           
        score = 0;
        $("#scorevalue").html(score);
           
        $("#trialsleft").show();
        trialsLeft = 3;
        addHearts();
        $("#gameover").hide();
           
        $("#startreset").html("Reset Game");
           
        startAction();
           
    }
}); 

$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score);
    
    document.getElementById("slicesound").play();
    stopAction();
    $("#fruit1").hide("explode");
    //get new fruits
    setTimeout(startAction, 500);
});   


function addHearts(){
    $("#trialsleft").empty();
    for(var i = 0; i < trialsLeft; i++){
        $("#trialsleft").append('<img src="images/heart.png" class="life">');
    }
}

function startAction(){
    $("#fruit1").show();
    chooseFruit();
    
    $("#fruit1").css({'left': Math.round(Math.random()*550), 'top': -50});
    
    step = 1 + Math.round(Math.random() * 5);
    action = setInterval(function(){
        $("#fruit1").css('top', 
        $("#fruit1").position().top + step);
        
        //check if the fruit is too low
        if($("#fruit1").position().top > $("#fruitsContainer").height()){
            if(trialsLeft > 1){
                
                $("#fruit1").show();
                chooseFruit();

                $("#fruit1").css({'left': Math.round(Math.random()*550), 'top': -50});
                step = 1 + Math.round(Math.random() * 5);
                
                trialsLeft--;
                addHearts();
                
            }
            else{
                playing = false;
                $("#startreset").html("Start Game");
                $("#gameover").show();
                $("#gameover").html('<p>Game Over!</p><p>Your score is '+score+'</p>');
                $("#trialsleft").hide();
                stopAction();
            }
        }
    }, 10);
}

function chooseFruit(){
    $("#fruit1").attr('src', 'images/' + fruits[Math.round(Math.random()*8)] + '.png');
}

function stopAction(){
    clearInterval(action);
    $("#fruits1").hide();
}
    
    
});    