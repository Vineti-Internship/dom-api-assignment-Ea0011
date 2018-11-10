const mainCircle = document.createElement('div');
const rotatingCircle = document.createElement('div');
const startButton = document.createElement('button');
const stopButton = document.createElement('button');

mainCircle.setAttribute('id', 'bigCircle');

rotatingCircle.setAttribute('id', 'rotatingCircle');

startButton.setAttribute('id', 'trigger');
stopButton.setAttribute('id', 'untrigger');

startButton.innerHTML = "Start!";
stopButton.innerHTML = "Stop!";

document.body.appendChild(mainCircle);
document.body.appendChild(rotatingCircle);
document.body.appendChild(startButton);
document.body.appendChild(stopButton);

let interval;

const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = mainCircle; // get offsets and size

const mainCircleDetails = { // center, radius and margins of the main circle
    mLeftMain: 150,
    mTopMain: 80,
    xMain: offsetLeft + offsetWidth / 2,
    yMain: offsetTop  + offsetHeight / 2,
    radiusMain: 245
}

const rotatingCircleDetails = { // center and radius of the rotating circle
    xRotating: rotatingCircle.offsetLeft + rotatingCircle.offsetWidth / 2,
    yRotating: rotatingCircle.offsetTop + rotatingCircle.offsetHeight / 2,
    radiusRotating: 50,
    reset: function() { // recalculate the coordinates of the center
        const rotatingCircle = document.getElementById('rotatingCircle');
        const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = rotatingCircle;
        this.xRotating = offsetLeft + offsetWidth / 2;
        this.yRotating = offsetTop + offsetHeight / 2;
    }
}

const state = { // state of the smaller circle
    mLeftRotating: 350, 
    mTopRotating: 35,
    diff: 1,
    points: [], // cached points
    cached: false,
    index: 0,
    nextY: () => { //calculate the y coordinate of the center
        const { xMain, yMain, radiusMain } = mainCircleDetails;
        const { xRotating } = rotatingCircleDetails;

        return yMain - Math.sqrt(radiusMain ** 2 - (xRotating - xMain) ** 2);
    },
    step: function() { // change the left margin, based on that calculate top margin
        const { mLeftMain } = mainCircleDetails;
        const { radiusRotating } = rotatingCircleDetails;

        if (this.mLeftRotating + radiusRotating + 5 >= mLeftMain + mainCircle.offsetWidth) { // smaller circle reaches rightmost part of the main circle
            this.diff = -1 * this.diff;
            // switch the formula to calculate correct y coordinate
            this.nextY = () => {
                const { xMain, yMain, radiusMain } = mainCircleDetails;
                const { xRotating } = rotatingCircleDetails;

                return Math.sqrt(radiusMain ** 2 - (xRotating - xMain) ** 2) + yMain;
            };
        }

        if (this.mLeftRotating + radiusRotating <= mLeftMain + 5) { // smaller cirlce reaches leftmost part of the main circle
            this.diff = -1 * this.diff;
            // switch the formula to calculate correct y coordinate
            this.nextY = () => {
                const { xMain, yMain, radiusMain } = mainCircleDetails;
                const { xRotating } = rotatingCircleDetails;

                return yMain - Math.sqrt(radiusMain ** 2 - (xRotating - xMain) ** 2);
            };
        }
        // cache the points to avoid recalculation after 1st rotation
        if (!this.cached) {
            this.mLeftRotating += this.diff;
            rotatingCircle.style.marginLeft = `${this.mLeftRotating}px`;
            rotatingCircleDetails.reset();
            const newY = this.nextY();
            const difference = newY - rotatingCircleDetails.yRotating;
            rotatingCircle.style.marginTop = `${this.mTopRotating + difference}px`;
            this.mTopRotating += difference;
            this.points.push({x: this.mLeftRotating, y: this.mTopRotating});
        } else {
            this.mLeftRotating = this.points[this.index].x;
            this.mTopRotating = this.points[this.index].y;
            this.index++;
            rotatingCircle.style.marginLeft = `${this.mLeftRotating}px`;
            rotatingCircle.style.marginTop = `${this.mTopRotating}px`;
        }

        if (this.mLeftRotating === 350 && this.mTopRotating <= 35) { // reached the top
            this.cached = true;
            this.index = 0;
        }
    }
}

startButton.addEventListener('click', () => { // set an interval that makes a step
    if (!interval) {
        interval = setInterval(() => { state.step() }, 5);
    }
});

stopButton.addEventListener('click', () => {
    if (interval) {
        clearInterval(interval);
        interval = undefined;
    }
})