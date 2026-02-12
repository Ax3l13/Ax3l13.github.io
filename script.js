
    let countdownElement = document.getElementById('countdown');
    let countdown = 10;

    let interval = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        if (countdown === 0) {
            clearInterval(interval);
            window.location.href = "https://les3as.synology.me/web_test/autoecoleles3as/main/";
        }
    }, 1000);
