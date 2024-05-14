var counter =0;
var check=0;
var quizquestion= document.getElementById("quiz-questions")
var ansArea=document.getElementById("answer-areas");
var sumRightyAnsr=0;
var screen=document.getElementById("myScreen");

var markCol=document.getElementById("markCol");
var markQuestion=``;

//var spanss=document.querySelector("#spans-container span");

var spanData=($(".spans-container span"));

function activateSpans() {
    spanData.removeClass("active"); 
    spanData.eq(counter).addClass("active"); 
}


    






async function Get(){
    var response= await fetch("html_questions.json")
    var res= await response.json();
  // spans(res.length)
   questionAndanswers(res,res.length);
   activateSpans();
//    GetAns(res[counter].correct_answer
//     );


   //console.log(res);

    $("#Next").on("click",function(){

        $("#Prev").prop("disabled",false);

        GetAns(res[counter].correct_answer
            );
       
        if(check==0){
           
            $("#Prev").css({
                "display":"block"
            })
            check++;
        }

        if(counter<res.length-1){
           

            counter++;
        questionAndanswers(res,res.length);
        


        }
        else if(counter == res.length-1){

            $("#Next").prop("disabled", true);
           



        }
       
        activateSpans();
        retrieveSelectedAnswer();
    
        

    })
    $("#Prev").on("click",function(){
        $("#Next").prop("disabled", false);
        GetAns(res[counter].correct_answer
            );
        if(counter>=1 && counter<=res.length-1){
            counter--;
        questionAndanswers(res,res.length);
      


        }
        else if(counter == 0){
            $("#Prev").prop("disabled",true);
    



        }
        activateSpans();
        retrieveSelectedAnswer();
    

    })


    $("#mark").on("click", function() {
        console.log(res[counter]);
        markQuestion += `<div class="markk" style="background-color: rgb(245, 230, 213);margin-bottom: 4% ;padding: 2%;display: flex;justify-content: space-evenly;font-weight: bolder;">
            Question ${counter+1}
            <input id="Go" class="go-btn" data-question="${counter+1}" style="border: solid 1px rgb(148, 143, 143);width: 25%; padding: 1%;color:#4D7298;
            ;border-radius: 20px;"  type="submit" value="Go">
            <input id="Delete" class="delete-btn" style="border: solid 1px rgb(148, 143, 143);width: 25%; padding: 1%;color: red;border-radius: 20px"  type="submit" value="Delete">
        </div>`;
        markCol.innerHTML = markQuestion;
    
        $(document).on("click", ".go-btn", function() {
            let questionNumber = $(this).data("question");
           

            
    
            counter = questionNumber - 1;
    
            questionAndanswers(res, res.length);
            activateSpans();
            retrieveSelectedAnswer();

            $("#Prev").prop("disabled", counter === 0);
            $("#Next").prop("disabled", counter === res.length - 1);
            $("#myScreen").css({
                "display": "none"
            });
        });
    
        $(document).on("click", ".delete-btn", function(e) {
            e.preventDefault();
            $(this).closest('.markk').remove();
        });
    });
 
  
    
}


Get();
var box=``;



function GetAns(r) {
    
    
        checkQuestion(r);
    
}


    




var qBox=``;
var aBox=``;

function questionAndanswers(js,len){
     

   if(counter<len){
    qBox=`<h2>${js[counter].title}</h2>
    `
   aBox=` <div class="answer">
   <input  type="radio" name="questions" id="a" data-answer="${js[counter].a}">
   <label for="a">${js[counter].a}</label>
</div>
<div class="answer">
   <input type="radio" name="questions" id="b" data-answer="${js[counter].b}">
   <label for="b">${js[counter].b}</label>
</div>
<div class="answer">
   <input type="radio" name="questions" id="c" data-answer="${js[counter].c}">
   <label for="c">${js[counter].c}</label>
</div>
<div class="answer">
   <input type="radio" name="questions" id="d" data-answer="${js[counter].d}">
   <label for="d">${js[counter].d}</label>
</div>`

quizquestion.innerHTML=qBox;
ansArea.innerHTML=aBox;
retrieveSelectedAnswer();




   }
  

}

var answerss= document.getElementsByName("questions");
function checkQuestion(ansr){
   
   let urAnswr;
   for(let i =0; i<answerss.length;i++){

    if(answerss[i].checked){
        urAnswr=answerss[i].dataset.answer;
    }

   }
  console.log(`rigth anser is ${ansr}`);
  console.log(`urAnswr is ${urAnswr}`);
  if(ansr== urAnswr){
    sumRightyAnsr++;
    console.log("good answer");

  }
  else{
    console.log("Bad Answer");
  }

   
  saveSelectedAnswer();

  
}


function saveSelectedAnswer() {
    var selectedAnswer = getSelectedAnswer();
    sessionStorage.setItem(`selectedAnswer_${counter}`, selectedAnswer);
}

function retrieveSelectedAnswer() {
    var selectedAnswer = sessionStorage.getItem(`selectedAnswer_${counter}`);
    if (selectedAnswer) {
        $('input[data-answer="' + selectedAnswer + '"]').prop("checked", true);
    }
}

function getSelectedAnswer() {
    var selectedAnswer = "";
    for (let i = 0; i < answerss.length; i++) {
        if (answerss[i].checked) {
            selectedAnswer = answerss[i].dataset.answer;
            break;
        }
    }
    return selectedAnswer;
}
$("#submit").on("click", function () {
    console.log(`Ur Result is ${sumRightyAnsr} from 10`);
    
    let resultWindow = window.open("", "_blank");
    resultWindow.document.write(`<div style="height: 100vh;width: 100%;background-color: rgb(241, 247, 247); display: flex;justify-content: center;align-items: center;"> 


    <div style="width: 80%; background-color: white;display: flex;align-items: center;height: 80%;    box-shadow: 0 50px 50px rgba(18, 16, 16, 0.1); border-radius: 30px;
    ">
    <div style="background-color: rgb(241, 247, 247);width: 50%;margin-left: 2%;text-align: center;padding: 3%;border-radius: 20px; box-shadow: 0 50px 50px rgba(18, 16, 16, 0.1)"><h2>Your Result is ${sumRightyAnsr} / 10 </h2>
        </div>
    
<div style="background-color: white;"><img style="width: 50%;" src="fill-out-concept-illustration_114360-5450.avif" alt="">
</div>


    </div>
    

</div>`);

    // Disable the ability to go back
    resultWindow.history.pushState(null, null, resultWindow.location.href);
    resultWindow.onpopstate = function () {
        resultWindow.history.pushState(null, null, resultWindow.location.href);
    };

    // Close the exam page
    window.close();
});






  function startCountdown(durationInSeconds) {
    let progressBar = document.getElementById('progress-bar');
    let timerValue = document.getElementById('timer-value');
    let remainingTime = durationInSeconds;

    function updateProgressBar() {
      let progress = (durationInSeconds - remainingTime) / durationInSeconds * 100;
      progressBar.style.width = progress + '%';
    }

    function updateTimer() {
      timerValue.textContent = remainingTime;
    }

    function countdown() {
        updateProgressBar();
        updateTimer();
    
        if (remainingTime <= 0) {
             clearInterval(intervalId);
            console.log('Time finished'); 
            
            $("#myScreen").css({
                "display":"flex"
            })
            var cont=`<div style="height: 100vh;width: 100%;background-color: #edede9; display: flex;justify-content: center;align-items: center;"> 


            <div style="width: 80%; background-color: white;display: flex;align-items: center;height: 80%;    box-shadow: 0 50px 50px rgba(18, 16, 16, 0.1); border-radius: 30px;
            ">
            <div style="background-color:#edede9;width: 40%;margin-left: 2%;text-align: center;padding: 3%;border-radius: 20px; box-shadow: 0 50px 50px rgba(18, 16, 16, 0.1)"><h2>Time Up </h2>
                </div>
            
        <div style="background-color: white;"><img style="width: 60%;" src="audit-concept-illustration_114360-6397.avif" alt="">
        </div>
        
        
            </div>
            
        
        </div>`;
            screen.innerHTML=cont;

    

        } 
        else 
        {
            remainingTime--;
        }
    }

    let intervalId = setInterval(countdown, 1000);
  }

  startCountdown(60); 