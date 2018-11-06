const mainCircle = document.createElement('div');
const rotatingCircle = document.createElement('div');

mainCircle.setAttribute('id', 'bigCircle');

rotatingCircle.setAttribute('id', 'rotatingCircle');

document.body.appendChild(mainCircle);
document.body.appendChild(rotatingCircle);

const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = mainCircle; // get offsets and size

const mainCircleDetails = { // center and radius of the circle
    mLeft: 150,
    mTop: 80,
    x: offsetLeft + offsetWidth / 2,
    y: offsetTop  + offsetHeight / 2,
    radius: 250
}

const rotatingCircleDetails = {
    x: rotatingCircle.offsetLeft + rotatingCircle.offsetWidth / 2,
    y: rotatingCircle.offsetTop + rotatingCircle.offsetHeight / 2,
    radius: 50,
    reset: function() { // recalculate the coordinates of the center
        const rotatingCircle = document.getElementById('rotatingCircle');
        const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = rotatingCircle;
        this.x = offsetLeft + offsetWidth / 2;
        this.y = offsetTop + offsetHeight / 2;
    }
}

const state = { // state of the smaller circle
    mLeft: 350, 
    mTop: 30,
    switchX: true,
    diff: 0.5,
    nextY: () =>  mainCircleDetails.y - Math.sqrt(250 ** 2 - (rotatingCircleDetails.x - mainCircleDetails.x) ** 2), //calculate the y coordinate of the center
    step: function() { // change the left margin, based on that calculate top margin
        if (this.mLeft + 60 >= mainCircleDetails.mLeft + mainCircle.offsetWidth) { // smaller circle reaches rightmost part of the main circle
            this.switchX = !this.switchX;
            this.diff = -1 * this.diff;
            this.nextY = () => Math.sqrt(250 ** 2 - (rotatingCircleDetails.x - mainCircleDetails.x) ** 2) + mainCircleDetails.y;
        }

        if (this.mLeft + 45 <= mainCircleDetails.mLeft) { // smaller cirlce reaches leftmost part of the main circle
            this.switchX = !this.switchX;
            this.diff = -1 * this.diff;
            this.nextY = () => mainCircleDetails.y - Math.sqrt(250 ** 2 - (rotatingCircleDetails.x - mainCircleDetails.x) ** 2);
        }

        this.mLeft += this.diff;
        rotatingCircle.style.marginLeft = `${this.mLeft}px`;
        rotatingCircleDetails.reset();
        const newY = this.nextY();
        const difference = newY - rotatingCircleDetails.y;
        rotatingCircle.style.marginTop = `${this.mTop + difference}px`;
        this.mTop += difference;
    }
}