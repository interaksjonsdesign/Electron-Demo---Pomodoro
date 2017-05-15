/*
    Pomodoro
    
    description: A JavaScript Pomodoro Timer
    
    author:  Olivier Klaver
    version: 1.0
*/


var startTime = 25; // in minutes


// trigger script once the DOM is loaded
window.addEventListener('DOMContentLoaded', function () {

    var duration    = {min: startTime, sec: 0};
    var pomoCounter = 0;
    var intervalTimer;

    // fetch the text fields and buttons
    var minTextObj    = document.querySelector('.duration .time');
    var unitTextObj   = document.querySelector('.duration .unit');
    var startButton   = document.querySelector('.start-button');
    var pomodoroCount = document.querySelector('.pomodoro-count');
    var documentTitle = document.querySelector('title');
    
    // store the original title message
    var origTitleMsg = documentTitle.textContent;

    // set the clock
    minTextObj.textContent = duration.min;

    // add event listener to the start button
    startButton.addEventListener('click', handleStartButtonClick);

    function handleStartButtonClick() {

        // remove time unit label
        unitTextObj.classList.add('hidden');

        // make start button invisible
        startButton.classList.add('invisible');
        
        // set body to active
        document.querySelector('body').classList.add('running');

        // update time text
        showDuration();

        var startTime = Math.floor(Date.now() / 1000);

        // create timer
        intervalTimer = setInterval(function () {

            // counter mechanism compensates for interval delays 
            // (especially if the window is not in focus)
            var counter = Math.floor(Date.now() / 1000) - startTime;
            if (counter > 0) startTime = Math.floor(Date.now() / 1000);
            for (var i = counter; i > 0; i--) {

                countDown();
                showDuration();

                // reset the clock once the time has run out
                if (duration.min == 0 && duration.sec == 0) {

                    // stop the interval
                    clearInterval(intervalTimer);
                    playAlarm();
                }
            }

        }, 200);
    }

    // this function decreases the duration with 1 sec
    function countDown() {

        if (duration.sec == 0) {
            duration.min -= 1;
            duration.sec = 59;
        } else {
            duration.sec -= 1;
        }
    }

    // show the remaining duration
    function showDuration() {

        var min = duration.min;
        var sec = duration.sec;
        if (min < 10) min = '0' + min;
        if (sec < 10) sec = '0' + sec;

        minTextObj.textContent = min + ":" + sec;
        documentTitle.textContent = min + ":" + sec + " | " + origTitleMsg;
    }

    // timer is done
    function playAlarm() {

        console.log('play alarm');

        pomoCounter++;
        pomodoroCount.textContent = pomoCounter;
        minTextObj.textContent = "done!";
        documentTitle.textContent = "done! | " + origTitleMsg;
        
        setTimeout(resetClock, 10 * 1000);
    }

    // reset the app
    function resetClock() {

        // make the start button visible again
        unitTextObj.classList.remove('hidden');
        startButton.classList.remove('invisible');
        document.querySelector('body').classList.remove('running');
        
        startButton.addEventListener('click', handleStartButtonClick);
        duration = {
            min: startTime,
            sec: 0
        };
        
        documentTitle.textContent = origTitleMsg;
        minTextObj.textContent = duration.min;
    }
});
