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

let form = document.querySelector("form");
let taskinput = document.querySelector("form input");
let taskinputtextarea = document.querySelector("form textarea");
let taskcheckbox = document.querySelector("form #check");


let currenttask = [
    {
        task : "ghar jao",
        details :"padai karo",
        imp: true
    },

    {
        task : "revison ",
        details :"coading practice",
        imp: true
    },

    {
        task : "phone chalana",
        details :"raat ko sote samay",
        imp: false
    },
]

// rendertask() function is used to add all the task present in current task into alltasks
function rendertask(){
    let allTask = document.querySelector(".all-task");

var sum = "";

currenttask.forEach(function(elem){
    sum= sum + `<div class="tasks">
                        <h5>${elem.task}<span class=${elem.imp}>imp</span></h5>
                        <button>mark as completed</button>
                    </div>`
    
});

allTask.innerHTML = sum;
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
    }
)
 taskinput.value="";
 taskinputtextarea.value="";
 taskcheckbox.checked= false;

rendertask();

    
});

