const sparkle = new Audio('./assets/mixkit-fairy-arcade-sparkle-866.wav');
const timerControlBtn = document.querySelector('.btn-start'); 
const tabs = document.querySelectorAll('.tab');
const timerEl = document.querySelector('.timer');
let interval;   // timer session
let isRunning = false;
let totalSeconds = 1500;

updateTimerDisplay();

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // accessing the mode value of the HTML tab elements (i.e. pomodoro)
        const mode = tab.dataset.mode;

        // set all tabs to inactive, then desired mode back to active
        // by default, pomodoro session is set to active
        tabs.forEach((tab) => tab.classList.remove('active'));
        tab.classList.add('active');

        // reset timer
        clearInterval(interval);
        isRunning = false;
        totalSeconds = parseInt(tab.dataset.time);
        timerControlBtn.textContent = "Start";

        updateTimerDisplay();

    });
});

function updateTimerDisplay () {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

}

function startTimer() {
    const tabActive = document.querySelector('.tab.active');

    // if it's already running, reset timer
    if (isRunning) {
        // current timer mode
        const mode = tabActive.dataset.mode;

        // reset
        clearInterval(interval);
        isRunning = false;
        totalSeconds = tabActive.dataset.time;
        timerControlBtn.textContent = 'Start';
        
        updateTimerDisplay();
    } else {
        // if not already running, start timer
        isRunning = true;
        timerControlBtn.textContent = 'Reset';
        
        interval = setInterval(() => {
            let minutes = Math.floor(totalSeconds/60);
            let seconds = totalSeconds % 60;

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            
            totalSeconds--;

            if (totalSeconds < 0) {
                clearInterval(interval);
                isRunning = false;
                sparkle.play();
                timerControlBtn.textContent = "Start";
                totalSeconds = tabActive.dataset.time;  // reset the time back to original duration
            }

            updateTimerDisplay();
        }, 1000);   // repeats every 1 sec
    }
}

timerControlBtn.addEventListener('click', startTimer);