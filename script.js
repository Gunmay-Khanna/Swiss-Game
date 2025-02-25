let score = 0;
let timer = 20;
let questionIndex = 0;
let factsDisplayed = false;  // Flag to check if facts are already shown
let factInterval;  // Variable to store fact display interval

const questions = [
    {
        city: "Zurich",
        question: "Which city is known for its banking and finance industry?",
        options: ["Zurich", "Geneva", "Lucerne", "Bern"],
        correctAnswer: "Zurich",
        funFacts: [
            "Zurich is Switzerland’s largest city.",
            "It is a global hub for banking and finance.",
            "The city is known for its high quality of life and is one of the richest cities in the world."
        ],
        backgroundImage: "url('zurich-background.jpg')" // Replace with Zurich-specific image
    },
    {
        city: "Geneva",
        question: "Which city is home to the headquarters of the United Nations?",
        options: ["Zurich", "Geneva", "Lucerne", "Bern"],
        correctAnswer: "Geneva",
        funFacts: [
            "Geneva is known for its international organizations.",
            "It is the second-largest city in Switzerland.",
            "The city is famous for the Geneva Conventions."
        ],
        backgroundImage: "url('geneva-background.jpg')" // Replace with Geneva-specific image
    },
    {
        city: "Lucerne",
        question: "Which city is famous for its Lion Monument?",
        options: ["Zurich", "Geneva", "Lucerne", "Bern"],
        correctAnswer: "Lucerne",
        funFacts: [
            "Lucerne is a city surrounded by stunning mountain scenery.",
            "It is home to the famous wooden Chapel Bridge.",
            "Lucerne’s Lion Monument honors the Swiss Guards who died during the French Revolution."
        ],
        backgroundImage: "url('lucerne-background.jpg')" // Replace with Lucerne-specific image
    },
    // Add more cities here with fun facts and backgrounds
];

let factTimeout;

// Update the question and options
function updateQuestion() {
    const questionObj = questions[questionIndex];
    changeBackground(questionObj.backgroundImage);
    factsDisplayed = false; // Reset the flag each time a new question is asked

    // Display facts before question
    displayFunFacts(questionObj.funFacts);

    // Set up question options after facts are shown
    setTimeout(() => {
        document.getElementById('question').textContent = questionObj.question;
        const options = document.getElementById('options');
        options.innerHTML = "";
        questionObj.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.onclick = () => {
                if (!factsDisplayed) { 
                    clearFunFacts(); // Stop facts from showing if the player clicked an option
                }
                checkAnswer(option);
            };
            options.appendChild(button);
        });

        startTimer();
    }, 5000); // Wait 5 seconds before showing the question (allowing facts to show first)
}

// Display multiple facts one at a time
function displayFunFacts(facts) {
    const factBox = document.getElementById('fact-box');
    let factIndex = 0;

    factBox.textContent = facts[factIndex];
    factBox.style.opacity = 1;

    // Show each fact in sequence
    factInterval = setInterval(() => {
        factIndex++;
        if (factIndex < facts.length) {
            factBox.textContent = facts[factIndex];
        } else {
            clearInterval(factInterval); // Stop showing facts after the last one
            setTimeout(() => {
                factBox.style.opacity = 0;
            }, 1000);
        }
    }, 3000); // Display each fact for 3 seconds
}

// Stop displaying facts once player starts answering
function clearFunFacts() {
    factsDisplayed = true;
    const factBox = document.getElementById('fact-box');
    factBox.style.opacity = 0;
    clearInterval(factInterval); // Stop fact intervals once the player clicks an answer
}

// Change background based on the city
function changeBackground(imageUrl) {
    document.body.style.backgroundImage = imageUrl;
}

// Check the answer and update the score
function checkAnswer(answer) {
    const correctAnswer = questions[questionIndex].correctAnswer;
    if (answer === correctAnswer) {
        score++;
        document.getElementById('score').textContent = "Score: " + score;
    }
    questionIndex++;
    if (questionIndex < questions.length) {
        updateQuestion();
    } else {
        showGameOver();
    }
}

// Show Game Over screen and final score
function showGameOver() {
    document.getElementById('game-over-message').textContent = "Game Over! Your final score is: " + score;
    setTimeout(resetGame, 5000); // Reset the game after 5 seconds
}

// Timer function
function startTimer() {
    const timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').textContent = "Time Left: " + timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            showGameOver();
        }
    }, 1000);
}

// Reset the game
function resetGame() {
    score = 0;
    timer = 20;
    questionIndex = 0;
    document.getElementById('score').textContent = "Score: " + score;
    document.getElementById('game-over-message').textContent = "";
    startTimer();
    updateQuestion();
}

// Start the game
startTimer();
updateQuestion();
