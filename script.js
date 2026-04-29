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

let dayPlanner = document.querySelector(".day-planner");

let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData"))||{};

let hours = Array.from({length:18},function(elem,idx){
    //console.log(idx);
    return `${6+idx}:00 - ${7+idx}:00`
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








