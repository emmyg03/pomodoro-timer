const sparkle = new Audio('./assets/mixkit-fairy-arcade-sparkle-866.wav');
// using querySelector() to select/update elements
const startBtn = document.querySelector('.btn-start');
const session = document.querySelector('.minutes');
let myInterval;
let state = true;   // when app running

startBtn.addEventListener("click", () => {
    console.log("hey");
})



const appTimer = () => {
    const sessionLength = Number.parseInt(session.textContent)

    // if app is running
    if(state) {
        state = false;
        // convert time left to seconds
        let totalSeconds = sessionLength * 60;

        const updateSeconds = () => {
            const minuteDiv = document.querySelector('.minutes');
            const secondDiv = document.querySelector('.seconds');

            totalSeconds--;

            let minutesLeft = Math.floor(totalSeconds/60);
            let secondsLeft = totalSeconds % 60;

            if (secondsLeft < 10) {
                secondDiv.textContent = '0' + secondsLeft;
            } else {
                secondDiv.textContent = secondsLeft;
            }
            minuteDiv.textContent = `${minutesLeft}`;

            if(minutesLeft === 0 && secondsLeft === 0) {
                sparkle.play()
                clearInterval(myInterval);
            }
        }
        // run updateSeconds() every 1000ms
        myInterval = setInterval(updateSeconds, 1000);
    } else {
        alert('Session has already started.')
    }
}

startBtn.addEventListener('click', appTimer);