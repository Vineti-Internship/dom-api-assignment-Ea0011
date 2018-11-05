const mainCircle = document.createElement('div');
const rotatingCircle = document.createElement('div');

mainCircle.setAttribute('id', 'bigCircle');
mainCircle.addEventListener('click', (e) => {console.log(e.clientX, e.clientY)});

rotatingCircle.setAttribute('id', 'rotatingCircle');

document.body.appendChild(mainCircle);
document.body.appendChild(rotatingCircle);

const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = mainCircle; // get offsets and size

const mainCirlceDetails = { // center and radius of the circle
    x: offsetLeft + offsetWidth / 2,
    y: offsetTop  + offsetHeight / 2,
    radius: 250
}

const rotatingCircleDetails = {
    x: rotatingCircle.offsetLeft + rotatingCircle.offsetWidth / 2,
    y: rotatingCircle.offsetTop + rotatingCircle.offsetHeight / 2,
    radius: 50,
    reset: function() {
        const rotatingCircle = document.getElementById('rotatingCircle');
        let { offsetTop, offsetLeft, offsetWidth, offsetHeight } = rotatingCircle;
        this.x = offsetLeft + offsetWidth / 2;
        this.y = offsetTop + offsetHeight / 2;
    }
}

console.log(offsetLeft, offsetTop);

const state = { // inital position of the smaller cirlce
    mLeft: 350, 
    mTop: 30,
    switchX: true,
    diff: 2,
    reset: function() {

    }
}

// TODO change margin-left, reset center, get y coordinate, get offsetTop, set marginTop (check to see fi switchX needs to be reverted);

console.log(mainCirlceDetails, state);