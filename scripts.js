// ===== GAME STATE VARIABLES =====
const TARGET_WORD = "WORDS";  // Our secret word for testing
let currentRow = 0;           // Which row we're filling (0-5)
let currentTile = 0;          // Which tile in the row (0-4)
let gameOver = false;         // Is the game finished?

// DOM element references (set up on page load)
let gameBoard, rows, debugOutput;

// ===== HELPER FUNCTIONS (PROVIDED) =====

// Debug/Testing Functions
function logDebug(message, type = 'info') {
    // Log to browser console
    console.log(message);
    
    // Also log to visual testing area
    if (!debugOutput) {
        debugOutput = document.getElementById('debug-output');
    }
    
    if (debugOutput) {
        const entry = document.createElement('div');
        entry.className = `debug-entry ${type}`;
        entry.innerHTML = `
            <span style="color: #666; font-size: 12px;">${new Date().toLocaleTimeString()}</span> - 
            ${message}
        `;
        
        // Add to top of debug output
        debugOutput.insertBefore(entry, debugOutput.firstChild);
        
        // Keep only last 20 entries for performance
        const entries = debugOutput.querySelectorAll('.debug-entry');
        if (entries.length > 20) {
            entries[entries.length - 1].remove();
        }
    }
}

function clearDebug() {
    const debugOutput = document.getElementById('debug-output');
    if (debugOutput) {
        debugOutput.innerHTML = '<p style="text-align: center; color: #999; font-style: italic;">Debug output cleared - ready for new messages...</p>';
    }
}

// Helper function to get current word being typed
function getCurrentWord() {
    const currentRowElement = rows[currentRow];
    const tiles = currentRowElement.querySelectorAll('.tile');
    let word = '';
    tiles.forEach(tile => word += tile.textContent);
    return word;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    gameBoard = document.querySelector('.game-board');
    rows = document.querySelectorAll('.row');
    debugOutput = document.getElementById('debug-output');
    
    logDebug("🎮 Game initialized successfully!", 'success');
    logDebug(`🎯 Target word: ${TARGET_WORD}`, 'info');
    logDebug("💡 Try typing letters, pressing Backspace, or Enter", 'info');
});

// ===== YOUR CHALLENGE: IMPLEMENT THESE FUNCTIONS =====

// TODO: Add keyboard event listener
document.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase(); 
    console.log("A key was pressed:", event.key);
// This regex pattern matches exactly one letter, case-insensitive
    if (/^[A-Z]$/.test(key)) {
    console.log("It's a single letter!");
    }

// You can also check string length and compare to letters:
    if (key.length === 1 && key >= 'A' && key <= 'Z') {
    console.log("Valid letter!");
    }
//string comparison:
    if (key === "BACKSPACE") {
        console.log("Backspace pressed");
    } else if (key === "ENTER") {
        console.log("Enter pressed");
        submitGuess(); 
        } else if (/^[A-Z]$/.test(key)) {
        addLetter(key); 
    }
    // TODO: Add your code here
    // Hint: Check if game is over first
    // Hint: Convert event.key to uppercase
    // Hint: Handle three cases: BACKSPACE, ENTER, and letters A-Z
    // Hint: Call the appropriate function for each case
});


// TODO: Implement addLetter function
function addLetter(letter) {
    logDebug(`🎯 addLetter("${letter}") called`, 'info');
    if (currentTile >= 5) {
        logDebug("Row is full, can't add more letters");
        return; // exit the function early
    }
    // Get the current row (remember: currentRow is a variable you have)
    const rowElement = rows[currentRow]; // rows is an array of row elements
    // Get all tiles in that row
    const tiles = rowElement.querySelectorAll('.tile'); // returns an array-like list
    // Get a specific tile by index
    const tile = tiles[currentTile]; // gets the 3rd tile (index 2)
    // Set text content
    tile.textContent = letter;
    tile.classList.add('filled'); // Add CSS classes
    logDebug(`Added "${letter}" to position ${currentTile} (row ${currentRow})`, 'success');
    
    currentTile += 1;
    logDebug(`Current word: ${getCurrentWord()}`, 'info');
    
}

// TODO: Implement deleteLetter function  
// function deleteLetter() {
//     // Your code here!
// }

// TODO: Implement submitGuess function
// function submitGuess() {
//     // Your code here!
// }

// TODO: Implement checkGuess function (the hardest part!)
// function checkGuess(guess, tiles) {
//     // Your code here!
//     // Remember: handle duplicate letters correctly
//     // Return the result array
// }