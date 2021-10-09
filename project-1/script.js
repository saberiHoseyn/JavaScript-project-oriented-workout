let inputConter = document.querySelector("#input-conter");
let startCounter = document.querySelector("#start-counter");
let errorElement = document.querySelector("#error-message");
let timerCircle = document.querySelector(".c100");
let startBox = document.querySelector(".start-box");
let timerNum = document.querySelector(".c100 > span");
let loadingMessage = document.querySelector(".message .loading");
let successMessage = document.querySelector(".message .success");

startCounter.addEventListener("click" , function(e) {
    let seconds = parseInt(inputConter.value);
    
    if(isNaN(seconds)){
        errorElement.textContent = "زمان را به درستی وارد کنید";
        errorElement.classList.add("active");
        return;
    };

    errorElement.classList.remove("active");
    timerCircle.style.display = "block";
    startBox.style.display = "none";
    timerNum.textContent = seconds;
    loadingMessage.style.display = "block";
    successMessage.style.display = "none";


    let originSeconds = seconds;
    let lastPersent = "p100";

    let timerId = setInterval( () => {
        if(lastPersent) timerCircle.classList.remove(lastPersent);

        if(seconds <= 0 ) {
            clearInterval(timerId);
            startBox.style.display = "block";
            timerCircle.style.display = "none";
            loadingMessage.style.display = "none";
            successMessage.style.display = "block";
            inputConter.value = "";
            timerCircle.classList.add("p100");
            return
        };



        seconds -= 1;
        let persent = Math.abs(Math.floor((((originSeconds - seconds) / originSeconds) * 100) - 100));
        console.log(persent);
        lastPersent = `p${persent}`;
        timerCircle.classList.add(lastPersent);
        timerNum.textContent = seconds;
    } , 1000);
});