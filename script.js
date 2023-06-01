window.onload = function() {
    var countdownElement = document.getElementById('countdown');
    var startButton = document.getElementById('startBtn');
    var my_audio = document.getElementById("audio");
    
    startButton.addEventListener('click', function() {
        startButton.setAttribute("disabled", "disabled");
        var durationInput = document.getElementById('duration');
        let initialDuration = parseInt(durationInput.value, 10);
        var duration = initialDuration * 60;
        
        if (!isNaN(duration) && duration > 0) {
            var targetDate = new Date().getTime() + (duration * 1000);
            
            var countdownInterval = setInterval(function() {
                var currentDate = new Date().getTime();
                var timeLeft = targetDate - currentDate;
                
                // Calculate days, hours, minutes, and seconds
                var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
                // Display the countdown
                countdownElement.innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
                
                if (timeLeft < 0) {
                    clearInterval(countdownInterval);
                    window.focus(); // Focus the browser tab
                    my_audio.play();
                    alert("Countdown of " + initialDuration + " minutes finished");
                    countdownElement.innerHTML = 'Countdown Finished';
                    startButton.removeAttribute("disabled");
                    my_audio.currentTime = "0";
                }
            }, 1000);
        }else{
            alert("Error : input value is incorrect.");
            startButton.removeAttribute("disabled");
        }
    });
};
