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
        document.getElementById('jokeElement').innerText = jokeText;

        // Read the joke aloud using Web Speech API
        announceContent();
    } catch (error) {
        console.error('Error fetching joke:', error);
    }
}

let speech;

function announceContent() {
    stopReading(); // Ensure any ongoing speech is stopped before starting a new one
    const headingText = document.querySelector('header h1').innerText;
    const jokeText = document.getElementById('jokeElement').innerText;
    const buttonText = 'There is a button to get a new joke.';

    const fullText = `${headingText}. ${jokeText}. ${buttonText}`;
    readAloud(fullText);
}

function readAloud(text) {
    stopReading(); // Ensure any ongoing speech is stopped before starting a new one
    speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    speech.pitch = 1;
    speech.rate = 1.2; // Increase the rate to make it faster
    speech.volume = 1;

    window.speechSynthesis.speak(speech);
}

function stopReading() {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
}

document.addEventListener('DOMContentLoaded', fetchJoke);

document.getElementById('newJokeBtn').addEventListener('click', fetchJoke);

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'a') {
        announceContent();
    } else if (event.ctrlKey && event.key === 'm') {
        stopReading();
    } else if (event.ctrlKey && event.key === 'f') {
        document.getElementById('newJokeBtn').click();
    }
});
