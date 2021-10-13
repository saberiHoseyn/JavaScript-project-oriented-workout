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

let volumeIcon = controls.querySelector(".volume ion-icon");
let volumeProgressBar = controls.querySelector(".volume .volume-progress");
let volumeProgressBarInput = volumeProgressBar.querySelector("input");

media.volume = .5;

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

volumeIcon.addEventListener("click" , function() {
    volumeProgressBar.classList.toggle("active");
});

volumeProgressBarInput.addEventListener("input" , function() {
    media.volume = this.value / 100;
    this.style = `background: linear-gradient(90deg, rgba(230,126,34,1) ${this.value}%, #e1e1e1 0%);`
});

fullscreen.addEventListener("click" , function() {
    
    if(!document.fullscreenElement) {
        if(playerArea.requestFullscreen) {
            playerArea.requestFullscreen();
        }else if(playerArea.mozFullscreenElement) {
            playerArea.mozFullscreenElement();
        }else  if(playerArea.msFullscreenElement) {
            playerArea.msFullscreenElement();
        }else  if(playerArea.webkitFullscreenElement) {
            playerArea.webkitFullscreenElement();
        }  
    }else {
        if(document.exitFullscreen) {
            document.exitFullscreen();
        }else if(document.mozCancelFullscreen) {
            document.mozCancelFullscreen();
        }else if(document.msCancelFullscreen) {
            document.msCancelFullscreen();
        }else if(document.webkitCancelFullscreen) {
            document.webkitCancelFullscreen();
        };
    };
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