const hero = document.querySelector(".hero");
const text = hero.querySelector("h1");
const walk = 500; //500px

hero.addEventListener("mousemove" , function(e) {
    const { offsetWidth : width , offsetHeight : height} = hero;
    let { offsetX : x , offsetY : y } = e;

    x += e.target.offsetLeft;
    y += e.target.offsetTop;

    const xWalk = Math.floor( (( x / width) * walk) - (walk / 2) );
    const yWalk = Math.floor( (( y / height) * walk) - (walk / 2) );

    text.style.textShadow = `
        ${xWalk}px ${yWalk}px 0 rgba(255, 71, 87, .7),
        ${xWalk}px ${yWalk * -1}px 0 rgba(255, 107, 129, .7),
        ${yWalk}px ${xWalk * -1}px 0 rgba(55, 66, 250, .7),
        ${yWalk * -1}px ${xWalk * -1}px 0 rgba(112, 161, 255, .7)
    `;
});