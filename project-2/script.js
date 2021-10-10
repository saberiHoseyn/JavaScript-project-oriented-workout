let playerArea = document.querySelector(".myplayer");
let media = playerArea.querySelector("video");
let controls = playerArea.querySelector(".myplayer-controls");
let play = controls.querySelector(".play");
let rwd = controls.querySelector(".rewind");
let fwd = controls.querySelector(".forward");
let fullscreen = controls.querySelector(".fullscreen");

let timerArea = controls.querySelector(".timer")
let currentTimer = timerArea.querySelector(".currentTimer");
let videoTime = timerArea.querySelector(".videoTime");

let timerBar = controls.querySelector(".controls-progressbar-current");

media.addEventListener("timeupdate" , function() {
    currentTimer.textContent = getTime(media.currentTime);
    videoTime.textContent = getTime(media.duration);

    let barLenght = (media.currentTime / media.duration) * 100 ;
    timerBar.style = `background: linear-gradient(to right , rgba(230,126,34,1)${barLenght}% , #e1e1e1 0% )`;
    timerBar.value = barLenght;
});

play.addEventListener("click" , function() {
    if(media.paused) {
        togglePlayIcon();
        media.play();
    }else {
        togglePlayIcon();
        media.pause();
    };
});

rwd.addEventListener("click" , function() {
    media.currentTime = media.currentTime - 5;
});

fwd.addEventListener("click" , function() {
    media.currentTime = media.currentTime + 5;
});

timerBar.addEventListener("input" , function() {
    media.currentTime = (this.value / 100) * media.duration;
});





let togglePlayIcon = () => {
    let icon = play.querySelector("ion-icon");
    let iconName = icon.attributes.name.nodeValue;
    if(iconName == "caret-forward-sharp") {
        icon.attributes.name.nodeValue ="pause-sharp";
    }else {
        icon.attributes.name.nodeValue ="caret-forward-sharp";
    }
};

let getTime = (time) => {
    let minutes = Math.floor(time / 60);
    let second = Math.floor(time - ( minutes * 60 ));
    let minutesValue , secondValue ;

    if(minutes < 10){
        minutesValue = `0${minutes}`;
    }else {
        minutesValue = minutes ;
    };

    if(second < 10){
        secondValue = `0${second}`;
    }else {
        secondValue = second ;
    };

    return `${minutesValue}:${secondValue}`;
};