// fetch('https://icanhazdadjoke.com/slack')
//     .then(data => data.json())
//     .then(jokeData => {
//         const jokeText = jokeData.attachments[0].text;
//         const jokeElement = document.getElementById('jokeElement');

//         jokeElement.innerHTML = jokeText;
//     })



// const ttsUrl = 'https://open-ai21.p.rapidapi.com/texttospeech';
const jokeUrl = 'https://icanhazdadjoke.com/slack';    

async function fetchJoke() {
    try {
        const jokeResponse = await fetch(jokeUrl, {
            headers: {
                'Accept': 'application/json'
            }
        });
        const jokeData = await jokeResponse.json();
        const jokeText = jokeData.attachments[0].text;
        document.getElementById('jokeElement').innerHTML = jokeText;

        // Read the joke aloud using Web Speech API
        readAloud(jokeText);
    } catch (error) {
        console.error('Error fetching joke:', error);
    }
}

let speech;

function readAloud(text) {
    stopReading(); // Ensure any ongoing speech is stopped before starting a new one
    speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    speech.pitch = 1;
    speech.rate = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);
}

function stopReading() {
    if (window.speechSynthesis.speaking) {
        console.log('Stopping speech');
        window.speechSynthesis.cancel();
    }
}

document.addEventListener('DOMContentLoaded', fetchJoke);

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'a') {
        const jokeText = document.getElementById('jokeElement').innerText;
        readAloud(jokeText);
    } else if (event.ctrlKey && event.key === 'm') {
        stopReading();
    }
});