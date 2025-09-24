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
    console.log("key pressed:", event.key);
// This regex pattern matches exactly one letter, case-insensitive
    if (/^[a-z]$/i.test(key)) {
    console.log("It's a single letter!");
    }

// You can also check string length and compare to letters:
    if (key.length === 1 && key >= 'A' && key <= 'Z') {
    console.log("Valid letter!");
    }
//string comparison:
    if (key === "BACKSPACE") {
        console.log("Backspace pressed");
        deleteLetter(); 
    } else if (key === "ENTER") {
        console.log("Enter pressed");
        submitGuess(); 
    } else if (/^[A-Z]$/.test(key)) {
        addLetter(key); 
    }
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
    tile.textContent = "A"; // puts the letter "A" in the tile

    // Add CSS classes
    tile.classList.add('filled'); // adds the 'filled' class for styling

    // Remove CSS classes (you'll use this later)
    tile.classList.remove('filled'); // removes the 'filled' class

    logDebug(`Added "${letter}" to position ${currentTile} (row ${currentRow})`, 'success'); 
    currentTile += 1;
    logDebug(`Current word: ${getCurrentWord()}`, 'info');
    
}

// TODO: Implement deleteLetter function  
function deleteLetter() {
    logDebug(`🗑️ deleteLetter() called`, 'info');
// Check if there are letters to delete
    if (currentTile <= 0) {
        logDebug("No letters in current row");
        return;
    }
    // Move back one position FIRST, then clear that tile
    currentTile--; // This decrements by 1 (same as currentTile = currentTile - 1)
    // Now currentTile points to the tile we want to clear

    const currentRowElement = rows[currentRow];
    const tiles = currentRowElement.querySelectorAll('.tile');
    const tile = tiles[currentTile]; // currentTile now points to the right tile

    // Get the letter before deleting it (for logging)
    const letter = tile.textContent;

    // Clear the tile
    tile.textContent = ''; // empty string removes the letter
    tile.classList.remove('filled'); // remove the styling class

    logDebug(`Delete "${letter}" from position ${currentTile} (row ${currentRow})`, 'success'); 
    logDebug(`Current word: ${getCurrentWord()}`, 'info');
}

// TODO: Implement submitGuess function
function submitGuess() {
    logDebug(`📝 submitGuess() called`, 'info');
    if (currentTile !== 5) {
        // Row is not full - need exactly 5 letters
        alert("Please enter 5 letters!");
        return; // exit early
    }
    
    const currentRowElement = rows[currentRow];
    const tiles = currentRowElement.querySelectorAll('.tile');
    let guess = ''; // start with empty string
    tiles.forEach(tile => {
        guess += tile.textContent;
    });

    logDebug(`Guess submitted: ${guess}`, 'info');
    logDebug(`Target word: ${TARGET_WORD}`, 'info');
    
    checkGuess(guess, tiles);

    currentRow++;     // move to next row (0→1, 1→2, etc.)
    currentTile = 0;  // reset to start of new row

    if (guess === TARGET_WORD) {
        gameOver = true; // player won!
        setTimeout(() => alert("Congratulations! You won!"), 500);
    } else if (currentRow >= 6) {
        gameOver = true; // player used all 6 rows - game over
    }

}

// TODO: Implement checkGuess function (the hardest part!)
    function checkGuess(guess, tiles) {
        logDebug(`🔍 Starting analysis for "${guess}"`, 'info');
    
    // TODO: Split TARGET_WORD and guess into arrays
    const target = TARGET_WORD.split('');
    const guessArray = guess.split('');
    const result = ['absent', 'absent', 'absent', 'absent', 'absent'];
    
    // STEP 1: Find exact matches
    for (let i = 0; i < 5; i++) {
        if (guessArray[i] === TARGET_WORD[i]) {
            result[i] = 'correct';
            target[i] = null;
            guessArray[i] = null;
        }
    }
    
    // STEP 2: Find wrong position matches  
    for (let i = 0; i < 5; i++) {
        if (guessArray[i] !== null) { // only check unused letters
            const pos = target.indexOf(guessArray[i]);
            if (pos !== -1) {
                result[i] = 'present';
                target[pos] = null;       // consume that target letter
                guessArray[i] = null;     // consume this guess letter
            }
        }
    }
    for (let i = 0; i < 5; i++) {
        tiles[i].classList.add(result[i]);  // "correct"/"present"/"absent"
    }
    return result;

}