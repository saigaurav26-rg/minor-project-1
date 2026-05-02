/// function openfeature() represents the opening of perticular car like todo, daily planner ,etc

function openfeatures() {
    let allElem = document.querySelectorAll(".elem");
let FullElemPage = document.querySelectorAll(".full-elem");
let FullElemPagebackbtn = document.querySelectorAll(".back");

allElem.forEach(function (elem) {
    //console.log(elem.id);
    elem.addEventListener("click",function () {
         FullElemPage.forEach(function() {
            //full.style.display = "none";
            FullElemPage[elem.id].style.display = "flex";
           
        })
         
        

       FullElemPagebackbtn.forEach(function(back) {
            back.addEventListener("click",function(){
              FullElemPage[back.id].style.display = "none";
                
            })   
        })  
    })
})
}
openfeatures();



function todolist(){
let form = document.querySelector("form");
let taskinput = document.querySelector("form input");
let taskinputtextarea = document.querySelector("form textarea");
let taskcheckbox = document.querySelector("form #check");


var currenttask = []; 

if(localStorage.getItem("currenttask")){
    currenttask = JSON.parse(localStorage.getItem("currenttask"));
}else{
    //alert("task list is empty...")
    console.log("task list is empty..");
    
}


// rendertask() function is used to add all the task present in current task into alltasks
function rendertask(){
    
    let allTask = document.querySelector(".all-task");

var sum = "";

currenttask.forEach(function(elem,idx){
    sum= sum + `<div class="tasks">
                        <h5>${elem.task}<span class=${elem.imp}>imp</span></h5>
                        <button id=${idx}>mark as completed</button>
                    </div>`
    
});

allTask.innerHTML = sum;
localStorage.setItem("currenttask",JSON.stringify(currenttask));

let markcompletedbtn = document.querySelectorAll(".tasks button");

markcompletedbtn.forEach(function(btn){
    btn.addEventListener("click",function(){
        currenttask.splice(btn.id,1)
        rendertask();
    })
    
})
}
rendertask();



// here we are push the input we are giving into alltask using render funtion...

form.addEventListener("submit",function(dets){
    dets.preventDefault();////stops the default behavior of form i.e.stops reloading the page//////

    //console.log(taskinput.value);
    //console.log(taskinputtextarea.value);
    //console.log(taskcheckbox.checked);
    
    currenttask.push(
        {
        task: taskinput.value,
        details: taskinputtextarea.value,
        imp: taskcheckbox.checked,
    })

 taskinput.value="";
 taskinputtextarea.value="";
 taskcheckbox.checked= false;
    rendertask();
    
});
}

todolist();


// todolist logic is completed upto here........ 

function dailyplanner(){
    let dayPlanner = document.querySelector(".day-planner");

let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData"))||{};

let hours = Array.from({length:18},function(elem,idx){
    //console.log(idx);
    //return `${6+idx}:00 - ${7+idx}:00`;
    
    let start = 6 + idx;
    let end = 7 + idx;

    return formatTime(start) + " - " + formatTime(end);
})

//console.log(hours);

let wholeDaySum = "";

hours.forEach(function(elem,idx){

    let SaveData = (dayPlanData[idx] || "")
    
    wholeDaySum = wholeDaySum + `<div class="day-planner-time">
                     <p>${elem}</p>
                    <input id=${idx} type="text" placeholder="..." value ="${SaveData}">
                   </div>`
})

dayPlanner.innerHTML= wholeDaySum;

//console.log(dayPlanData);


let dayPlannerInput = document.querySelectorAll(".day-planner input");

dayPlannerInput.forEach(function(elem){
    elem.addEventListener("input",function(){
        //console.log(elem);
        dayPlanData[elem.id] = elem.value;
        localStorage.setItem("dayPlanData",JSON.stringify(dayPlanData))
        
    })
})

function formatTime(hour) {
    let suffix;
    let formattedHour;

    if (hour >= 12) {
        suffix = "PM";
    } else {
        suffix = "AM";
    }

    if (hour % 12 === 0) {
        formattedHour = 12;   // handles 0 and 12
    } else {
        formattedHour = hour % 12;
    }

    return  formattedHour + ":00" + suffix;
}

}

dailyplanner();

//daily planner section is completed here.......

let motivation = document.querySelector(".motivation2 h2");
let author = document.querySelector(".motivation3 h1");
let back = document.querySelectorAll(".back");

function motivationquotes(){
    function fetchquotes(){
     let request= fetch("http://api.quotable.io/random");
     request.then(raw=>raw.json())
     .then(function(data){
        motivation.innerHTML = data.content;
        author.innerHTML = "- " + data.author;
     })
}
fetchquotes();

back.forEach(function(btn){
    
    btn.addEventListener("click",function(){
       // console.log(btn.id);
        fetchquotes()
    })
    
})
}

motivationquotes();

// motivation section is completed 

let totalseconds = 25*60;
let timer = document.querySelector(".pomo-timer h1");
let startBtn = document.querySelector(".startbtn")
let pauseBtn = document.querySelector(".pausebtn")
let resetBtn = document.querySelector(".resetbtn")
let timerinterval = null;
let isworksession = true;

function upDatetime(){
    let minutes =Math.floor(totalseconds/60);
    let seconds = totalseconds%60;

    timer.innerHTML = `${String(minutes).padStart("2","0")}:${String(seconds).padStart("2","0")}`;

}

function starttimer(){
    clearInterval(timerinterval);
   
    if(isworksession){
        totalseconds = 25*60;
         timerinterval = setInterval(function(){
        if(totalseconds>0){
             totalseconds--;
             upDatetime( );
        }else{
            isworksession = false;
            clearInterval(timerinterval)
            timer.innerHTML="05:00"
     }
    },10);
 }else{
    totalseconds = 5*60;
      timerinterval = setInterval(function(){
        if(totalseconds>0){
             totalseconds--;
             upDatetime( );
        }else{
            isworksession = true;
            clearInterval(timerinterval)
            timer.innerHTML="25:00"
     }
    },10);
 }
}

function pausetimer(){
    clearInterval(timerinterval);
}

function resettimer(){
     totalseconds = 25*60;
    upDatetime();
    clearInterval(timerinterval);
}

startBtn.addEventListener("click",starttimer);
pauseBtn.addEventListener("click",pausetimer);
resetBtn.addEventListener("click",resettimer);












