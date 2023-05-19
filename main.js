
var isGameActive = false;

var level = 1;
var playerHealth = 100;
var enemyHealth = 100;

const playerHealthBar = document.getElementById("player-healthbar").getElementsByClassName("health-text")[0];
const enemyHealthBar = document.getElementById("enemy-healthbar").getElementsByClassName("health-text")[0];
const levelText = document.getElementById("level-text").getElementsByTagName("h3")[0];
const glyphContainer = document.getElementById("glyph-container");
const tooltip = document.getElementById("tooltip");

const glyphChoices = ["warding", "insight", "fury"];

const glyphOutcomes = {
    warding: {
        beats: ["fury"]
    },
    insight: {
        beats: ["warding"]
    },
    fury: {
        beats: ["insight"]
    },
};

function showTooltip () {
    if (!isGameActive){
        tooltip.classList.add("fadeIn");
    }
}

function startNewGame(){

    level = 1;
    playerHealth = 100;
    enemyHealth = 100;
    setHealthText(); 
    setLevelText();
    glyphContainer.classList.remove("greyed-out");
    isGameActive = true;
}

function setHealthText () {
    playerHealthBar.innerText = `${playerHealth}%`;
    playerHealthBar.style.width = `${playerHealth}%`;
    enemyHealthBar.innerText = `${enemyHealth}%`; 
    enemyHealthBar.style.width = `${enemyHealth}%`; 
}

function setLevelText () {
    levelText.innerText = `Level ${level}`;
}

function getComputerChoice () {
    randomNumber = Math.floor(Math.random() * glyphChoices.length);
    return glyphChoices[randomNumber];
}

function getPlayerChoice (choice) {
    if (isGameActive){
        playRound(choice);
    }

    showTooltip();
}

function playRound (playerSelection) {
    let computerSelection = getComputerChoice();

    if (playerSelection == computerSelection){
        console.log("Tied!");
        return; // The round is tied.    
    }

    let playerOutcome = glyphOutcomes[playerSelection];
    if (playerOutcome.beats.includes(computerSelection)) {
        console.log("Won!");
        decreaseHealth("enemy");
        return; // Winning round!
    }

    console.log("Lost!");
    decreaseHealth("player");
    return; // Losing round!
}

function decreaseHealth (entity) {
    if (entity == "player")
        {
            playerHealth -= 10;

            if (playerHealth <= 0)
            {
                GameOver();
            }
        }
    else if (entity == "enemy")
        {
            enemyHealth -=10;

            if (enemyHealth <= 0)
            {
                LevelUp();
            }
        }
    setHealthText();
}

function GameOver () {
    
    glyphContainer.classList.add("greyed-out");
    isGameActive = false;
}

function LevelUp () {
    level++;
    playerHealth = 100;
    enemyHealth = 100;
    setLevelText();
    setHealthText();
}