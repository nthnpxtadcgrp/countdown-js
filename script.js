window.onload = function() {
    var title = document.title;
    var countdownElement = document.getElementById('countdown');
    var startButton = document.getElementById('startBtn');
    var my_audio = document.getElementById("audio");
    let countdown_name = "";
    
    startButton.addEventListener('click', function() {
        startButton.setAttribute("disabled", "disabled");
        var durationInput = document.getElementById('duration');
        let initialDuration = parseInt(durationInput.value, 10);
        var duration = initialDuration * 60;
        
        tmp_countdown_name = document.getElementById("countdown-name").value;
        if(tmp_countdown_name)
            countdown_name = tmp_countdown_name

        end_countdown_string = "Countdown of " + initialDuration + " minutes finished"
        if(countdown_name)
            end_countdown_string = "Countdown \"" + countdown_name + "\" of " + initialDuration + " minutes finished"
        
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
                let countdown_string = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
                countdownElement.innerHTML = countdown_string;
                document.title = countdown_string;
                if (timeLeft < 0) {
                    clearInterval(countdownInterval);
                    window.focus(); // Focus the browser tab
                    my_audio.currentTime = "0";
                    my_audio.play();
                    
                    alert(end_countdown_string);
                    document.title = title;
                    countdownElement.innerHTML = end_countdown_string
                    startButton.removeAttribute("disabled");
                }
            }, 1000);
        }else{
            alert("Error : input value is incorrect.");
            startButton.removeAttribute("disabled");
        }
    });
};

window.addEventListener('beforeunload', function(event) {
    // Cancel the event (modern browsers)
    event.preventDefault();
    // Chrome requires returnValue to be set
    event.returnValue = '';
    
    // Prompt the user with a warning message
    return 'Are you sure you want to leave this page?';
});