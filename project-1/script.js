let inputConter = document.querySelector("#input-conter");
let startBox = document.querySelector(".start-box");
let startCounter = document.querySelector("#start-counter");
let timerCircle = document.querySelector(".c100");
let timerNum = document.querySelector(".c100 > span");
let lastPersent = "p100";
let originSeconds , seconds, timerId;



startCounter.addEventListener("click" , function(e) {
    seconds = parseInt(inputConter.value);
    
    if(isNaN(seconds)) return  toggleErrorMessage( { show : true , message : "زمان را به درستی وارد کنید" });


    toggleErrorMessage({show : false});
    toggleStartBox({show : false});
    toggleLoadingMessage({show : true});
    toggleTimer({show : true , seconds});


    originSeconds = seconds;
    timerId = setInterval( startTimer , 1000);
});




let toggleErrorMessage = ({show , message}) =>{
    let errorElement = document.querySelector("#error-message");

    if(show){
        errorElement.textContent = "زمان را به درستی وارد کنید";
        errorElement.classList.add("active");
    }else {
        errorElement.classList.remove("active");
    };
};

let toggleStartBox = ({show}) =>{
    if(show) {
        startBox.style.display = "block";
        inputConter.value = "";
    }else {
        startBox.style.display = "none";
    };
};

let toggleLoadingMessage = ({show}) =>{
    let loadingMessage = document.querySelector(".message .loading");
    let successMessage = document.querySelector(".message .success");

    if(show) {
        loadingMessage.style.display = "block";
        successMessage.style.display = "none";
    }else {
        loadingMessage.style.display = "none";
        successMessage.style.display = "block";
    };
};

let startTimer = () => {
    if(lastPersent) timerCircle.classList.remove(lastPersent);


    if(seconds <= 0 ) {
        clearInterval(timerId);
        toggleStartBox({show : true});
        toggleLoadingMessage({show : false})
        toggleTimer({show : false});
        return
    };

    seconds -= 1;
    timerNum.textContent = seconds;

    lastPersent = `p${Math.abs(Math.floor((((originSeconds - seconds) / originSeconds) * 100) - 100))}`;
    timerCircle.classList.add(lastPersent);
};

let toggleTimer = ({show , seconds}) =>{
    if(show) {
        timerCircle.style.display = "block";
        timerNum.textContent = seconds;
    }else {
        timerCircle.style.display = "none";
        timerCircle.classList.remove(lastPersent);
        lastPersent = "p100";
        timerCircle.classList.add(lastPersent);
    };
};